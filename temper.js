const Dashboard = props => {
  const [data, setData] = useState();
  let history = useHistory();
  let { path, url } = useRouteMatch();

  useEffect(() => {
    let data = JSON.parse(sessionStorage.getItem("user"));
    setData(() => {
      data
    });
  }, []);

  let header = new URL(window.location.href).searchParams.get("header");

  return (
    <>
      {data === null ? (
        <>{history.push("/prisijungimas")}</>
      ) : (
        <DashboardWrapper>
          <Navigation>
            <DashboardLogo>
              <img src={dashboardLogo} />
              <h1>Valdymo panelė</h1>
            </DashboardLogo>

            <nav>
              <ul>
                <li>
                  <Link to="/panele/skelbimuvaldymas?header=Valdykite sukurtus darbo pasiūlymus">
                    Sukurtų darbo pasiūlymų valdymas
                  </Link>
                </li>
                <li>
                  {" "}
                  <Link path="/panele/valdymas">Pranešimai</Link>
                </li>
                <li>
                  {" "}
                  <Link path="/panele/valdymas">Pagalbos centras</Link>
                </li>
                <li>
                  {" "}
                  <Link path="/panele/valdymas">Vartotoju valdymas</Link>
                </li>
                <li>
                  {" "}
                  <Link path="/panele/valdymas">Logs</Link>
                </li>
                <li>
                  {" "}
                  <Link path="/panele/valdymas">Mano profilis</Link>
                </li>
              </ul>
            </nav>
          </Navigation>

          <EditorWindow>
            <EditorHeader>
              <h1>{header}</h1>
            </EditorHeader>
            <Editor id="style-1">
              <Switch>
                <Route path={`${path}/skelbimas`}>
                  <JobPost />
                </Route>
                <Route
                  path={`${path}/skelbimuvaldymas`}
                  component={ControlJobPost}
                />
              </Switch>
            </Editor>
          </EditorWindow>
        </DashboardWrapper>
      )}
    </>
  );
};