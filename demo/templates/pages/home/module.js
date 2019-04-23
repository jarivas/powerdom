class Home extends PD.Template{
    navigate(e) {
        PD.menu.changePage(e.target.dataset.index)
    }
}

export default Home