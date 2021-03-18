var backgroundShader;


function initBackgroundShader() {
    backgroundShader = initShaders("background-vs","background-fs");
    
    // active ce shader
    gl.useProgram(backgroundShader);
    
    // adresse des variables dans le shader associé
    backgroundShader.offsetUniform = gl.getUniformLocation(backgroundShader, "uOffset");
    backgroundShader.amplitudeUniform = gl.getUniformLocation(backgroundShader, "uAmplitude");
    backgroundShader.frequencyUniform = gl.getUniformLocation(backgroundShader, "uFrequency");
    backgroundShader.persistenceUniform = gl.getUniformLocation(backgroundShader, "uPersistence");

    console.log("background shader initialized");
}

function Background() {

    // un tableau contenant les positions des sommets (sur CPU donc)
    var vertices = [
	-1.0,-1.0, 0.9999,
	1.0,-1.0, 0.9999,
	1.0, 1.0, 0.9999,
	-1.0, 1.0, 0.9999
    ];
    
    
    var coords = [
	0.0, 0.0, 
	1.0, 0.0, 
	1.0, 1.0, 
	0.0, 1.0
    ];
    
    var tri = [0,1,2,0,2,3];
    
    this.initParameters();
    
    this.vao = gl.createVertexArray();
    gl.bindVertexArray(this.vao);
    
    // cree un nouveau buffer sur le GPU et l'active
    this.vertexBuffer = gl.createBuffer();
    this.vertexBuffer.itemSize = 3;
    this.vertexBuffer.numItems = 4;
    gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexBuffer);
    gl.enableVertexAttribArray(0);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
    gl.vertexAttribPointer(0, this.vertexBuffer.itemSize, gl.FLOAT, false, 0, 0);
    
    // meme principe pour les coords de texture
    this.coordBuffer = gl.createBuffer();
    this.coordBuffer.itemSize = 2;
    this.coordBuffer.numItems = 4;
    gl.bindBuffer(gl.ARRAY_BUFFER, this.coordBuffer);
    gl.enableVertexAttribArray(1);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(coords), gl.STATIC_DRAW);
    gl.vertexAttribPointer(1, this.coordBuffer.itemSize, gl.FLOAT, false, 0, 0);

    // creation des faces du cube (les triangles) avec les indices vers les sommets
    this.triangles = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.triangles);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(tri), gl.STATIC_DRAW);
    this.triangles.numItems = 6;

    gl.bindVertexArray(null);

    console.log("background initialized");
}

Background.prototype.shader = function() {
    return backgroundShader;
}

Background.prototype.initParameters = function() {
    // paramètres envoyés au shader pour générer le fond
    this.timer = 0.0;
    this.offset = [0.0,0.0];
    this.amplitude = 5.0;
    this.frequency = 4.0;
    this.persistence = 0.5;
}

Background.prototype.setParameters = function(elapsed) {
    // animer le fond en modifiant la variable offset
    // par exemple :
    this.offset[1] += 0.005;
    this.timer += 0.005;
    //this.persistence = 0.5 + 0.2*Math.sin(this.timer);
    //this.frequency = 4.0 - 2.0*Math.sin(this.timer);
}

Background.prototype.sendUniformVariables = function() {
    // fonction appelée avant le dessin : envoie de toutes les variables au shader
    gl.uniform2fv(backgroundShader.offsetUniform,this.offset);
    gl.uniform1f(backgroundShader.amplitudeUniform,this.amplitude);
    gl.uniform1f(backgroundShader.frequencyUniform,this.frequency);
    gl.uniform1f(backgroundShader.persistenceUniform,this.persistence);
}

Background.prototype.draw = function() {
    // cette fonction dessine la géométrie du background (ici 2 triangles stockés dans les 2 buffers)
    gl.bindVertexArray(this.vao);
    gl.drawElements(gl.TRIANGLES, this.triangles.numItems, gl.UNSIGNED_SHORT, 0);
    gl.bindVertexArray(null);
}


Background.prototype.clear = function() {
    // clear all GPU memory
    gl.deleteBuffer(this.vertexBuffer);
    gl.deleteBuffer(this.coordBuffer);
    gl.deleteVertexArray(this.vao);
    this.loaded = false;
}
