// Jest global setup file

// --- Polyfill Web Streams API (used by undici) ---
import { ReadableStream, WritableStream, TransformStream } from 'node:stream/web';
globalThis.ReadableStream = globalThis.ReadableStream || ReadableStream;
globalThis.WritableStream = globalThis.WritableStream || WritableStream;
globalThis.TransformStream = globalThis.TransformStream || TransformStream;

// --- Polyfill MessageChannel / MessagePort / BroadcastChannel (used by undici and MSW) ---
import { MessageChannel, MessagePort, BroadcastChannel } from 'worker_threads';
globalThis.MessageChannel = globalThis.MessageChannel || MessageChannel;
globalThis.MessagePort = globalThis.MessagePort || MessagePort;
globalThis.BroadcastChannel = globalThis.BroadcastChannel || BroadcastChannel;

// --- Polyfill EventTarget (used by undici) ---
const { EventTarget } = require('events');
globalThis.EventTarget = globalThis.EventTarget || EventTarget;

// --- Polyfill TextEncoder / TextDecoder (used by undici & fetch) ---
import { TextEncoder, TextDecoder } from 'node:util';
globalThis.TextEncoder = globalThis.TextEncoder || TextEncoder;
globalThis.TextDecoder = globalThis.TextDecoder || TextDecoder;

// --- Polyfill fetch + related (used by MSW & EmailForm tests) ---
const { fetch, Headers, Request, Response } = require('undici');
globalThis.fetch = globalThis.fetch || fetch;
globalThis.Headers = globalThis.Headers || Headers;
globalThis.Request = globalThis.Request || Request;
globalThis.Response = globalThis.Response || Response;
