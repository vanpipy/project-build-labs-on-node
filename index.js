function function_name(argument) {
    const [hello, setHello] = React.useState();
    return (
        <h1>{hello}</h1>
    );
}

React.render(
    <App />,
    document.getElementById('app')
);
