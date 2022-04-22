var App = React.createClass({
    getInitialState: function() {
        return {
            list: [],
            content: ""
        };
    },

    handleClick: function(e) {

        var bodyFormData = new FormData();
        var self = this;
        if(this.state.content == "") {
            if(confirm("input body text!")) {
                $('#body-text').focus();
            }
            return;
        }
        bodyFormData.append('book_text', this.state.content);

        axios({
            method: "post",
            url: "http://localhost:8080/book_text",
            data: bodyFormData,
            headers: { "Content-Type": "application/json" },
          })
            .then(function (response) {
              //handle success
              self.setState({ list: response.data })
            })
            .catch(function (response) {
              //handle error
              console.log(response);
            });
    },

    handleChange: function(event) {
        this.setState({ content: event.target.value});
    },

    render: function() {
        return (<div className="container">
            <div className="row" style={{ display: "flex"}}>
                <div className="col-md-4">
                    <p style={{ "text-align": "center"}}>parse book text</p>
                </div>
                <div className="col-md-8">
                    <p style={{ "text-align": "center"}}>top rated word and count</p>
                </div>
            </div>
            <div className="row" style={{ display: "flex"}}>
                <div className="col-md-6">
                    <textarea class="form-control" style={{"font-size": "16px", "resize":"none"}} id="body-text" placeholder="input body" value={this.state.content} onChange={(e) => this.handleChange(e)} multiple rows="20" cols="50"/>
                </div>
                <div className="col-md-6">
                    <ul className="list-group">
                        {this.state.list.map((word, index) => 
                            (<li className="list-group-item" key={word.word}>
                                <div className="row" >
                                    <div className="col-md-2">
                                        {index + 1}
                                    </div>
                                    <div className="col-md-6">
                                        {word.word}
                                    </div>
                                    <div className="col-md-4">
                                        {word.count}
                                    </div>
                                </div>
                            </li>)
                        )}
                    </ul>
                </div>
            </div>
            <button type="button" className="btn btn-primary" onClick={(e) => this.handleClick(e)}>Try!</button>
        </div>);
    }
});

React.render(
    React.createElement(App, {}),
    document.body
);
