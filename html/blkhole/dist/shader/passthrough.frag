precision mediump float;

uniform sampler2D texture0;
uniform vec2 resolution;

void main() {
    vec2 uv = gl_FragCoord.xy / resolution.xy;
    gl_FragColor = texture2D(texture0, uv);
} 