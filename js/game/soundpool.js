class Soundpool {
    music;
    heroDammage;

    constructor() {
        this.music = new Audio('./sound/music.mp3')
        this.music.loop = true;
        this.heroDammage = new Audio('./sound/hero-dammage.mp3')
    }
}