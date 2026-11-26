'use strict';

const FOUNDER_ID = 'd2aec2b075cc02d9';
const FOUNDER_FINGERPRINT =
    'e727e88f5f16e0f30d0afb427fc9bf11dec816bbd74a2ee7d10dfcc2429746d8';
const MAX_CONTENT_BYTES = 5 * 1024 * 1024;
const MAX_PAGE_PAYLOAD_BYTES = MAX_CONTENT_BYTES + 64 * 1024;
const encoder = new TextEncoder();

const statusNode = document.querySelector('#status');
const pageNode = document.querySelector('#page');
const titleNode = document.querySelector('#page-title');
const provenanceNode = document.querySelector('#page-provenance');
const contentNode = document.querySelector('#page-content');

function setError(message) {
    statusNode.textContent = message;
    statusNode.classList.add('error');
    statusNode.hidden = false;
    pageNode.hidden = true;
}

function safeIdentifier(value) {
    return /^[A-Za-z0-9_-]{1,128}$/.test(value || '');
}

function toHex(buffer) {
    return Array.from(new Uint8Array(buffer))
        .map(value => value.toString(16).padStart(2, '0'))
        .join('');
}

async function sha256Text(value) {
    return toHex(await crypto.subtle.digest('SHA-256', encoder.encode(value)));
}

function pemToDer(pem) {
    const base64 = pem
        .replace('-----BEGIN PUBLIC KEY-----', '')
        .replace('-----END PUBLIC KEY-----', '')
        .replace(/\s/g, '');
    const binary = atob(base64);
    const bytes = new Uint8Array(binary.length);
    for (let index = 0; index < binary.length; index += 1) {
        bytes[index] = binary.charCodeAt(index);
    }
    return bytes.buffer;
}

function signatureBytes(base64) {
    const binary = atob(base64);
    const bytes = new Uint8Array(binary.length);
    for (let index = 0; index < binary.length; index += 1) {
        bytes[index] = binary.charCodeAt(index);
    }
    return bytes.buffer;
}

function lengthPrefixed(value) {
    const text = String(value);
    return `${encoder.encode(text).length}:${text}`;
}

function responseSignaturePayload(message) {
    return 'pangeanet.web-page.v1'
        + lengthPrefixed(message.requestId)
        + lengthPrefixed(message.ownerId)
        + lengthPrefixed(message.pageId)
        + lengthPrefixed(message.title)
        + lengthPrefixed(message.contentHash)
        + lengthPrefixed(message.updatedAt);
}

function originSignaturePayload(proof) {
    return 'pangeanet.web-origin.v1'
        + lengthPrefixed(proof.ownerId)
        + lengthPrefixed(proof.pageId)
        + lengthPrefixed(proof.title)
        + lengthPrefixed(proof.contentHash)
        + lengthPrefixed(proof.updatedAt);
}

async function verifyIdentityKey(userId, publicKey) {
    if (userId === FOUNDER_ID) {
        const fingerprint = await crypto.subtle.digest('SHA-256', pemToDer(publicKey));
        return toHex(fingerprint) === FOUNDER_FINGERPRINT;
    }
    return userId === await sha256Text(publicKey);
}

async function verifyRsaSignature(payloadText, signature, publicKey) {
    if (!signature || signature.algorithm !== 'SHA256withRSA'
        || typeof signature.signature !== 'string') {
        return false;
    }
    const payload = encoder.encode(payloadText);
    if (await sha256Text(payloadText) !== signature.dataHash) {
        return false;
    }
    const key = await crypto.subtle.importKey(
        'spki',
        pemToDer(publicKey),
        { name: 'RSASSA-PKCS1-v1_5', hash: 'SHA-256' },
        false,
        ['verify']);
    return crypto.subtle.verify(
        'RSASSA-PKCS1-v1_5',
        key,
        signatureBytes(signature.signature),
        payload);
}

async function verifyPage(message) {
    if (await sha256Text(message.content) !== message.contentHash) return false;
    if (!await verifyIdentityKey(message.hostUserId, message.publicKey)
        || !await verifyRsaSignature(
            responseSignaturePayload(message), message.signature, message.publicKey)) {
        return false;
    }
    if (!message.rehosted) return message.hostUserId === message.ownerId;
    const proof = message.originProof;
    if (!proof || proof.version !== 1 || proof.ownerId !== message.ownerId
        || proof.pageId !== message.pageId || proof.title !== message.title
        || proof.contentHash !== message.contentHash || proof.updatedAt !== message.updatedAt
        || !await verifyIdentityKey(proof.ownerId, proof.publicKey)) {
        return false;
    }
    return verifyRsaSignature(originSignaturePayload(proof), proof.signature, proof.publicKey);
}

function sanitizeHtml(html) {
    const parser = new DOMParser();
    const source = parser.parseFromString(html, 'text/html');
    const fragment = document.createDocumentFragment();
    const allowedTags = new Set([
        'A', 'B', 'BLOCKQUOTE', 'BR', 'CODE', 'DIV', 'EM', 'H1', 'H2', 'H3', 'H4', 'H5', 'H6',
        'HR', 'I', 'IMG', 'LI', 'OL', 'P', 'PRE', 'S', 'SPAN', 'STRONG', 'TABLE', 'TBODY',
        'TD', 'TH', 'THEAD', 'TR', 'U', 'UL'
    ]);

    function appendNode(node, target) {
        if (node.nodeType === Node.TEXT_NODE) {
            target.append(document.createTextNode(node.textContent || ''));
            return;
        }
        if (node.nodeType !== Node.ELEMENT_NODE) return;
        if (!allowedTags.has(node.tagName)) {
            for (const child of node.childNodes) appendNode(child, target);
            return;
        }
        const safe = document.createElement(node.tagName.toLowerCase());
        if (node.tagName === 'A') {
            const href = node.getAttribute('href') || '';
            if (/^(https?:|mailto:|#)/i.test(href)) {
                safe.setAttribute('href', href);
                safe.setAttribute('rel', 'noopener noreferrer nofollow');
                if (!href.startsWith('#')) safe.setAttribute('target', '_blank');
            }
        } else if (node.tagName === 'IMG') {
            const sourceUrl = node.getAttribute('src') || '';
            if (/^data:image\/(?:png|jpeg|gif|webp);base64,[A-Za-z0-9+/=]+$/i.test(sourceUrl)
                && encoder.encode(sourceUrl).length <= 2 * 1024 * 1024) {
                safe.setAttribute('src', sourceUrl);
                const alt = node.getAttribute('alt');
                if (alt) safe.setAttribute('alt', alt.slice(0, 512));
            } else {
                return;
            }
        }
        for (const child of node.childNodes) appendNode(child, safe);
        target.append(safe);
    }

    for (const child of source.body.childNodes) appendNode(child, fragment);
    return fragment;
}

function renderPage(message) {
    titleNode.textContent = message.title || message.pageId;
    const servingText = message.rehosted
        ? `Re-hosted by ${message.hostUserId}`
        : `Hosted by its verified owner`;
    provenanceNode.textContent =
        `${servingText} · PangeaNet owner ${message.ownerId}`;
    contentNode.replaceChildren(sanitizeHtml(message.content));
    document.title = `${message.title || message.pageId} · PangeaNet`;
    statusNode.hidden = true;
    pageNode.hidden = false;
}

function decodeBase64(base64) {
    const binary = atob(base64);
    const bytes = new Uint8Array(binary.length);
    for (let index = 0; index < binary.length; index += 1) {
        bytes[index] = binary.charCodeAt(index);
    }
    return bytes;
}

function configurePeerConnection(socket, requestId, iceServers, onPage) {
    const peer = new RTCPeerConnection({ iceServers });
    let expectedChunks = 0;
    const chunks = [];

    peer.addEventListener('icecandidate', event => {
        if (event.candidate) {
            socket.send(JSON.stringify({
                type: 'web_rtc_candidate',
                requestId,
                candidate: event.candidate.candidate,
                mid: event.candidate.sdpMid || '0'
            }));
        }
    });
    peer.addEventListener('datachannel', event => {
        const channel = event.channel;
        socket.send(JSON.stringify({
            type: 'web_rtc_connected',
            requestId
        }));
        channel.addEventListener('message', async channelEvent => {
            let message;
            try {
                message = JSON.parse(channelEvent.data);
            } catch {
                return;
            }
            if (message.requestId !== requestId) return;
            if (message.type === 'web_page_begin') {
                if (!Number.isInteger(message.chunks)
                    || message.chunks <= 0 || message.chunks > 128) {
                    channel.close();
                    setError('The page transfer was invalid.');
                    return;
                }
                expectedChunks = message.chunks;
                chunks.length = 0;
                return;
            }
            if (message.type === 'web_page_chunk') {
                if (!Number.isInteger(message.index) || message.index < 0
                    || message.index >= expectedChunks || typeof message.data !== 'string') {
                    channel.close();
                    setError('The page transfer was invalid.');
                    return;
                }
                chunks[message.index] = decodeBase64(message.data);
                return;
            }
            if (message.type !== 'web_page_end' || expectedChunks === 0) return;
            if (chunks.length !== expectedChunks || chunks.some(chunk => !chunk)) {
                channel.close();
                setError('The page transfer was incomplete.');
                return;
            }
            try {
                const payloadLength = chunks.reduce((size, chunk) => size + chunk.length, 0);
                if (payloadLength > MAX_PAGE_PAYLOAD_BYTES) throw new Error('size');
                const payload = new Uint8Array(payloadLength);
                let offset = 0;
                for (const chunk of chunks) {
                    payload.set(chunk, offset);
                    offset += chunk.length;
                }
                const pageMessage = JSON.parse(new TextDecoder().decode(payload));
                if (typeof pageMessage.content !== 'string'
                    || encoder.encode(pageMessage.content).length > MAX_CONTENT_BYTES
                    || !await verifyPage(pageMessage)) {
                    throw new Error('verification');
                }
                onPage(pageMessage);
                channel.close();
            } catch {
                setError('The direct page response did not pass host-signature verification.');
                channel.close();
            }
        });
    });
    peer.addEventListener('connectionstatechange', () => {
        if (peer.connectionState === 'failed') {
            setError('A direct P2P WebRTC connection could not be established.');
        }
    });
    return peer;
}

function connectToRelay(socketUrl, ownerId, pageId, onInitialFailure) {
    const requestId = crypto.randomUUID();
    const socket = new WebSocket(socketUrl);
    let responseReceived = false;
    let socketOpened = false;
    let initialFailureNotified = false;
    const reportInitialFailure = () => {
        if (initialFailureNotified) return;
        initialFailureNotified = true;
        onInitialFailure();
    };
    const iceServers = Array.isArray(window.PANGEANET_WEB_CONFIG?.iceServers)
        ? window.PANGEANET_WEB_CONFIG.iceServers
        : [{ urls: 'stun:stun.l.google.com:19302' }];
    const peer = configurePeerConnection(socket, requestId, iceServers, message => {
        if (message.ownerId !== ownerId || message.pageId !== pageId) {
            setError('The direct page response did not match the requested page.');
            return;
        }
        responseReceived = true;
        window.clearTimeout(timeout);
        renderPage(message);
        socket.close();
        peer.close();
    });
    let remoteDescriptionReady = false;
    const pendingRemoteCandidates = [];
    const timeout = window.setTimeout(() => {
        if (responseReceived) return;
        setError('No PangeaNet host completed a direct WebRTC connection.');
        socket.close();
        peer.close();
    }, 45000);

    socket.addEventListener('open', () => {
        socketOpened = true;
        socket.send(JSON.stringify({
            type: 'web_page_request',
            requestId,
            ownerId,
            pageId
        }));
    });
    socket.addEventListener('message', async event => {
        let message;
        try {
            message = JSON.parse(event.data);
        } catch {
            return;
        }
        if (message.requestId !== requestId) return;
        if (message.type === 'web_page_unavailable') {
            responseReceived = true;
            window.clearTimeout(timeout);
            setError(message.message || 'The page is currently unavailable.');
            socket.close();
            return;
        }
        try {
            if (message.type === 'web_rtc_offer') {
                if (typeof message.description !== 'string') return;
                await peer.setRemoteDescription({
                    type: 'offer',
                    sdp: message.description
                });
                remoteDescriptionReady = true;
                for (const candidate of pendingRemoteCandidates) {
                    await peer.addIceCandidate(candidate);
                }
                pendingRemoteCandidates.length = 0;
                const answer = await peer.createAnswer();
                await peer.setLocalDescription(answer);
                socket.send(JSON.stringify({
                    type: 'web_rtc_answer',
                    requestId,
                    description: answer.sdp,
                    descriptionType: 'answer'
                }));
            } else if (message.type === 'web_rtc_candidate') {
                if (typeof message.candidate !== 'string') return;
                const candidate = {
                    candidate: message.candidate,
                    sdpMid: message.mid || '0',
                    sdpMLineIndex: 0
                };
                if (remoteDescriptionReady) {
                    await peer.addIceCandidate(candidate);
                } else {
                    pendingRemoteCandidates.push(candidate);
                }
            }
        } catch {
            setError('The WebRTC connection negotiation failed.');
        }
    });
    socket.addEventListener('error', () => {
        if (!responseReceived && !socketOpened) {
            reportInitialFailure();
        }
    });
    socket.addEventListener('close', () => {
        if (!responseReceived && !socketOpened) {
            reportInitialFailure();
        } else if (!responseReceived) {
            setError('No PangeaNet host is connected for this page.');
        }
    });
}

function relaySocketUrl(relay) {
    const address = String(relay?.address || '').trim();
    const port = Number(relay?.port || 443);
    if (!address || !Number.isInteger(port) || port < 1 || port > 65535) return null;
    const host = address.includes(':') && !address.startsWith('[')
        ? `[${address}]`
        : address;
    const url = new URL(`wss://${host}:${port}/web-relay`);
    return url.protocol === 'wss:' ? url : null;
}

async function start() {
    const params = new URLSearchParams(window.location.search);
    const ownerId = params.get('owner') || '';
    const pageId = params.get('page') || '';
    if (!safeIdentifier(ownerId) || !safeIdentifier(pageId)) {
        setError('This PangeaNet web link has invalid page identifiers.');
        return;
    }
    try {
        const discoveryUrl =
            new URL(window.PANGEANET_WEB_CONFIG?.discoveryUrl || '');
        if (discoveryUrl.protocol !== 'https:') {
            throw new Error('discovery');
        }
        const response = await fetch(discoveryUrl, {
            cache: 'no-store',
            credentials: 'omit',
            referrerPolicy: 'no-referrer'
        });
        if (!response.ok) throw new Error('discovery');
        const data = await response.json();
        const candidates = Array.isArray(data.relays)
            ? data.relays.map(relaySocketUrl).filter(Boolean)
            : [];
        if (!candidates.length) {
            setError('No PangeaNet relay client is currently online.');
            return;
        }
        let candidateIndex = 0;
        const tryNextRelay = () => {
            if (candidateIndex >= candidates.length) {
                setError('None of the advertised PangeaNet relay clients could be reached.');
                return;
            }
            const candidate = candidates[candidateIndex++];
            connectToRelay(candidate, ownerId, pageId, tryNextRelay);
        };
        tryNextRelay();
    } catch {
        setError('The PangeaNet relay discovery service is unavailable.');
    }
}

start();
