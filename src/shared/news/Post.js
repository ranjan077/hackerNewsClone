import React , {useState} from 'react';
import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en';

function Post({post, index, upVotePost}) {
    TimeAgo.addLocale(en);
    const timeAgo = new TimeAgo('en-US');
    const [hide, setHide] = useState(false);
    if(hide) {
        return '';
    }

    return (
        <div key={post.objectID}>
            <div className="postContainer">
                <div className="rankContainer">
                <span className="rank">{index + 1}.</span> 
                <button className="votearrow-btn" onClick={e => !post.isUpvoted && upVotePost(post.objectID)}><span className="votearrow"></span></button>
                </div>
                <div className="titleContainer"> 
                <a className="storylink" href={post.url}>{post.title}</a>
                <div className="sub-info">
                    <span className="points">{post.points} points by </span>
                    <span className="author">{post.author} </span>
                    <span className="time">{timeAgo.format(new Date(post.createdAt))}</span>
                    <span className="pipe"> | </span>
                    <button className="hide-btn" onClick={e => setHide(!hide)}> hide </button>
                    <span className="pipe"> | </span>
                    <span className="comments"> {post.commentsCount} comments</span>
                </div>
                </div>
            </div>
        </div>
    );
}

export default Post;
