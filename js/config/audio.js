import * as THREE from 'three';
import { createAudioNormalizer } from './audioNormalizer';

export class AudioManager {
    constructor(camera) {
        this.listener = new THREE.AudioListener();
        camera.add(this.listener);

        this.loader = new THREE.AudioLoader();
        this.sound = new THREE.Audio(this.listener);

        // 🔥 Add normalizer using the SAME audio context Three.js uses
        this.normalizer = createAudioNormalizer(this.listener.context);

        this.introPool = [
            { name: "A Crazy Christmas", file: "audio/a-crazy-christmas-30-seconds-407465.mp3" },
            { name: "Jingle Bells", file: "audio/jingle-bells-house-background-xmas-music-for-video-christmas-song-261159.mp3" },
            { name: "We Wish You a Merry Christmas", file: "audio/we-wish-you-a-merry-christmas-xmas-background-short-music-30-second-178228.mp3" },
            { name: "New Year Ident", file: "audio/new-year-ident-451464.mp3" }
        ];

        this.mainPool = [
            { name: "Christmas Crystal Air", file: "audio/christmas-crystal-air-439854.mp3" },
            { name: "Christmas Heartbeat", file: "audio/christmas-heartbeat-439860.mp3" },
            { name: "Christmas Lights Above", file: "audio/christmas-lights-above-439882.mp3" },
            { name: "Christmas Snow Lantern", file: "audio/christmas-snow-lantern-439891.mp3" }
        ];

        this.playlist = [];
        this.currentIndex = 0;
        this.preparePlaylist();
    }

    preparePlaylist() {
        const randomIntro = this.introPool[Math.floor(Math.random() * this.introPool.length)];
        const shuffledMain = [...this.mainPool].sort(() => Math.random() - 0.5);
        this.playlist = [randomIntro, ...shuffledMain];
    }

    async start() {
        if (this.listener.context.state === 'suspended') {
            await this.listener.context.resume();
        }
        
        // ONLY load the first track if we haven't started yet
        if (!this.sound.buffer) {
            this.loadAndPlay(0);
        }
    }

    loadAndPlay(index) {
        if (this.sound.isPlaying) {
            this.sound.stop();
        }
        this.sound.onEnded = null;

        // ADD THIS: Explicitly clear old buffer for GC
        if (this.sound.buffer) {
            this.sound.buffer = null;
        }

    this.currentIndex = index;
        const track = this.playlist[this.currentIndex];
        const filePath = `${track.file}`;

        this.loader.load(
            filePath,
            (buffer) => {
                this.sound.setBuffer(buffer);
                this.sound.setLoop(false);
                this.sound.setVolume(0.5);

                // 🔥 Auto-normalize loudness using Three.js internals
                // this.sound.source = AudioBufferSourceNode
                // this.sound.gain   = GainNode
                if (this.sound.source && this.sound.gain) {
                    this.normalizer.normalize(this.sound.source, this.sound.gain);
                }

                this.sound.onEnded = () => {
                    this.skip();
                };

                this.sound.play();
            },
            undefined,
            (err) => {
                this.skip();
            }
        );
    }

    skip() {
        const nextIndex = (this.currentIndex + 1) % this.playlist.length;
        this.loadAndPlay(nextIndex);
    }

    // Settings panel controls
    setVolume(val) {
        this.listener.setMasterVolume(val);
    }

    getVolume() {
    return this.listener.getMasterVolume();
    }

    pause() {
        if (this.sound.isPlaying) this.sound.pause();
    }

    resume() {
        if (!this.sound.isPlaying) this.sound.play();
    }
}
