import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import NewsList from '../components/NewsList';
import Filter from '../components/Filter';
import actions from "../actions/NewsListAction";
import Api from '../Api/api'

class Post extends Component {
  static initialServerFecth() {
    return Api.fetchNews();
  }
  constructor(props) {
    super(props);
    this.state = {
      page: 0,
    }
  }
  componentDidMount() {
    const {news} = this.props;
    if (news && news.length === 0) {
      this.props.actions.getNews();
    }
  }ß
  requestMoreNews = () => {
    this.setState((prevState) => {
      return {...prevState, page: prevState.page +1};
    }, () => {
      this.props.actions.getMoreNews(`page=${this.state.page}`);
    });
  }
  render() {
    const { news } = this.props;
    return (
      <div className="mainContainer">
        <div className="header">
          <h1>Hacker News Clone</h1>
          <Filter {...this.props.actions}/>
        </div>
        <NewsList news={news} {...this.props.actions}/>
        <div>
          <button className="more-btn" onClick={this.requestMoreNews}>More</button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  news: state.news
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
      ...actions,
  }, dispatch),
});


export default connect(mapStateToProps, mapDispatchToProps)(Post);
