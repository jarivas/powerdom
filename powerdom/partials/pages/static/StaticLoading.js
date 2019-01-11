class StaticLoading extends PartialTemplate {
    static loading(){
        LoadingComponent.show();

        setTimeout(() => {LoadingComponent.close()}, 3000);
    }
}