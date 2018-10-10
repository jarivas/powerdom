class StaticDialog extends PartialTemplate {
    setUp() {
        //Associates a Powerdom instance to a static variable.
        //StaticDialog.prototype.helloButton = PD('button');

        //Already is defined on the html using the actionableElement property
        //This PowerDom Instance is created on html render time and assigned to 
        //ClassName.prototype.actionableElement (.prototype is the static equivalent on js)
    }
    
    bind(){
        //Adds a click event lister that will run the static StaticDialog.sayHello function.
        //StaticDialog.prototype.listen('click', StaticDialog.sayHello);

        //Already is defined on the html using the listen property.
        //If you inspect the button you will as the event is there, it was added
        //on html render time
    }

    static sayHello(){
        DialogComponent
            .setContent('<p>Hello World!</p>')
            .setActions([{click: "DialogComponent.close", title: "Close me :)"}])
            .show();
    }
}