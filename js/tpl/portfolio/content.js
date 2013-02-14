function content(){
    this.html =
        '<section id="content" class="body">'+
        '</section><!-- /#content -->';
}

content.prototype = new Template();

Content = new content();