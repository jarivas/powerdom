class StaticNotification extends PartialTemplate {
    static notification(){
        NotificationComponent.show("Hello from the other side");
    }
}