function content(){
    this.html =
        '<section id="content" class="body">'+
        '<p>%%curdate%%</p>'+
        '</section><!-- /#content -->';
}

content.prototype = new Template();

Content = new content();