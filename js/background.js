//var backgroundShader;


// function initBackgroundShader() {
//     backgroundShader = initShaders("background-vs", "background-fs");

//     // active ce shader
//     gl.useProgram(backgroundShader);

//     // adresse des variables dans le shader associé
//     backgroundShader.offsetUniform = gl.getUniformLocation(backgroundShader, "uOffset");
//     backgroundShader.amplitudeUniform = gl.getUniformLocation(backgroundShader, "uAmplitude");
//     backgroundShader.frequencyUniform = gl.getUniformLocation(backgroundShader, "uFrequency");
//     backgroundShader.persistenceUniform = gl.getUniformLocation(backgroundShader, "uPersistence");
// }

class BackgroundParallaxe {
    layer0;
    layer1;
    layer2;

    constructor() {
        this.layer0 = new BackgroundLayer(getBG0Texture);
        this.layer1 = new BackgroundLayer(getBG1Texture, 0.0005);
        this.layer2 = new BackgroundLayer(getBG2Texture, 0.00075);
    }

    draw() {
        gl.useProgram(Sprite.shader);
        
        this.layer2.sendUniformVariables();
        this.layer2.draw();

        this.layer1.sendUniformVariables();
        this.layer1.draw();

        this.layer0.sendUniformVariables();
        this.layer0.draw();

    }

    setParameters(elapsed) {
        this.layer2.setParameters(elapsed);
        
        this.layer1.setParameters(elapsed);
        
        this.layer0.setParameters(elapsed);
    }
}