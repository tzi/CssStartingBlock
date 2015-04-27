var unindentor = function(contentElementList) {
    for (var i=0; i<contentElementList.length; i++) {
        var contentElement = contentElementList[i];
        var lines = contentElement.innerHTML.split('\n');
        var content = [];
        var indentation;
        for (var j=0; j<lines.length; j++) {
            var line = lines[j];
            if (typeof indentation != 'string') {
                var trimmed = line.trim();
                if (trimmed) {
                    indentation = line.substr(0, line.indexOf(trimmed[0]));
                }
            }
            if (typeof indentation == 'string') {
                if (line.startsWith(indentation)) {
                    line = line.substr(indentation.length);
                }
                content.push(line);
            }
        }
        contentElement.innerHTML = content.join('\n');
    }
};

if (typeof String.prototype.startsWith != 'function') {
    String.prototype.startsWith = function (str){
        return this.slice(0, str.length) == str;
    };
}