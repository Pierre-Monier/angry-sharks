class Soundpool {
    music;
    heroDammage;

    constructor() {
        this.music = new Audio('./sound/mario64-theme.mp3')
        this.music.loop = true;
        this.heroDammage = new Audio('./sound/hero-dammage.mp3')
    }
}
