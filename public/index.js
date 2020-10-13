'use strict';

const e = React.createElement;

class ListItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: props.id,
            name: props.name,
            listId: props.listId,
            class: props.last,
        }
    }
    render() {
        if (this.state.class) console.log(this.state.class);
        return (
            <tr class={this.state.class}> 
                <td class="id">Id:{this.state.id}</td>
                <td class="name">Name: {this.state.name}</td>
                <td class="listId">ListID:{this.state.listId}</td>
            </tr>
        )
    }
}
class List extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoaded: false
        }
    }

    componentDidMount() {
        const URL = "/items";
        fetch(URL)
            .then(res => res.json())
            .then(
                (result) => {
                    //We could handle this later, but I'd rather save the adjustments into state. So I'm not having to everytime it loads. Keeps it more efficent
                    const filtered = result.filter(item => {
                        return item.name ? true : false; //Withou Curly braces would be nice but making the comparison into one statement is better then 2. This will check for both empty and null strings
                        }); //Bad names are either null or blank. Anything else is ITEM SPACE NUMBER. 
                    filtered.sort(function (a, b) {
                        if (a.listId - b.listId != 0) return a.listId - b.listId;
                        else {
                            const aNameNum = parseInt(a.name.substring(4)); //The names are just ITEM SPACE Number. So, I'll assume this is the standard for names and take off "Item " part to help sort them.
                            const bNameNum = parseInt(b.name.substring(4));
                            if (aNameNum == bNameNum) return 0; //No Number theoretically will ever match but just in case. It'll do nothing at least vs mis-placing it.
                            else return aNameNum > bNameNum ? 1 : -1;
                        }
                    });
                    this.setState({
                        isLoaded: true,
                        items: filtered
                    });
                },
                (error) => {
                    console.log(error);
                    this.setState({
                        isLoaded: true,
                        errors: error
                    });
                }
            )
    }

    render() {
        console.log(this.state.errors);
        let items = [];
        let currentGroup = 0; // This is used to help seperate List Groups by highlighting the start of a new group.
        if (this.state.errors) items = (<p>An error occured: {this.state.errors.toString()}</p>);
        else if (this.state.isLoaded) {
            items = this.state.items.map((item, index) => {
                if (currentGroup != item.listId) {
                    currentGroup = item.listId;
                    return <ListItem last="listEnd" id={item.id} name={item.name} listId={item.listId} />
                }
                return <ListItem id={item.id} name={item.name} listId={item.listId} />
            }
            )
        }
        else items = <p class="load" >Loading Data</p>;
        return (
            <table border="1">
                <tr>
                    <th>Id</th>
                    <th>Name</th>
                    <th>ListId</th>
                </tr>
                {items}
            </table>
        )
    }
}

const domContainer = document.getElementById("container");
ReactDOM.render(e(List), domContainer);