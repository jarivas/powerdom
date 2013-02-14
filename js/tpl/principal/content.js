function content(){
    this.html = '<p>%%curdate%%</p>';
}

content.prototype = new Template();

Content = new content();