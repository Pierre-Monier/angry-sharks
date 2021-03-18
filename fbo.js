// les FBO permettent de dessiner directement dans des textures plutot que sur l'écran
// on utilisera ce module pour (peut etre) faire du post-process si on a le temps

function FBO(width,height,nbTex,needDepth) {
    this.myId = gl.createFramebuffer(); // creation du fbo
    this.width = width;
    this.height = height;
    this.textures = [];
    this.renderbuffer = null;

    var t = gl.UNSIGNED_BYTE;
    //var t = gl.FLOAT;

    var f = gl.LINEAR;

    gl.bindFramebuffer(gl.FRAMEBUFFER,this.myId); // on l'active

    for(var i=0;i<nbTex;++i) {
        tex = gl.createTexture(); // creation d'une texture
        tex.width = this.width;
        tex.height = this.height;
        gl.bindTexture(gl.TEXTURE_2D, tex);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, this.width,this.height, 0, gl.RGBA,t, null); // sans donnees!!
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, f);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, f);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
        gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0+i, gl.TEXTURE_2D, tex, 0); // on attache cette texture au fbo
        this.textures.push(tex);
    }

    // meme chose pour une texture de profondeur si necessaire 
    // note: un renderbuffer ~= texture, mais manipulable
    if(needDepth) {
        this.renderbuffer = gl.createRenderbuffer();
        gl.bindRenderbuffer(gl.RENDERBUFFER, this.renderbuffer);
        gl.renderbufferStorage(gl.RENDERBUFFER, gl.DEPTH_COMPONENT16, this.width,this.height);
        gl.framebufferRenderbuffer(gl.FRAMEBUFFER, gl.DEPTH_ATTACHMENT, gl.RENDERBUFFER, this.renderbuffer);
    }

    // on desactive tout
    gl.bindTexture(gl.TEXTURE_2D, null);
    gl.bindRenderbuffer(gl.RENDERBUFFER, null);
    gl.bindFramebuffer(gl.FRAMEBUFFER, null);
}

FBO.prototype.id = function() {
    return this.myId;
}

FBO.prototype.texture = function(i) {
    return this.textures[i];
}

FBO.prototype.clear = function() {
    // clear all GPU memory
    for(var i=0;i<this.textures.length;++i) {
	gl.deleteTexture(this.textures[i]);
    }

    if(this.renderbuffer) {
	gl.deleteRenderBuffer(this.renderbuffer);
    }
    
    gl.deleteFramebuffer(this.myId);
    this.myId = null;
}
