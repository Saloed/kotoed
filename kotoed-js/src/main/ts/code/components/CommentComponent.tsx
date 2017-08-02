import * as $ from "jquery"
import "bootstrap-less"
import * as React from "react";
import * as ReactMarkdown from "react-markdown";
import * as moment from "moment";

import {Comment} from "../state";

type CommentProps = Comment & {
    onUnresolve: (id: number) => void
    onResolve: (id: number) => void
}

export default class CommentComponent extends React.Component<CommentProps, {}> {
    getPanelClass = () => {
        if (this.props.state == "open")
            return "panel-primary";
        else
            return "panel-default"
    };

    renderPanelLabel = () => {
        if (this.props.state == "open")
            return null;
        else
            return <span className="label label-default">Resolved</span>;
    };

    handleStateChange = () => {
        if (this.props.state == "closed")
            this.props.onUnresolve(this.props.id);
        else
            this.props.onResolve(this.props.id);
    };

    getStateButtonIcon = () => {
        if (this.props.state == "closed")
            return "glyphicon-remove-circle";
        else
            return "glyphicon-ok-circle";
    };

    getStateButtonText = () => {
        if (this.props.state == "closed")
            return "Unresolve";
        else
            return "Resolve";
    };

    renderOpenCloseButton = () => {
        // TODO check if we should render it

        return <div ref={(me: HTMLDivElement) => $(me).tooltip()}
                    className="comment-state-change-button"
                    onClick={this.handleStateChange}
                    data-toggle="tooltip"
                    data-placement="left"
                    title={this.getStateButtonText()}>
            <span className={`glyphicon ${this.getStateButtonIcon()}`} />
        </div>;
    };

    render() {
        return (
            <div className={`panel ${this.getPanelClass()} comment`}>
                <div className="panel-heading comment-heading clearfix">
                    <div className="pull-left">
                        <b>{this.props.authorName}</b>
                        {` @ ${moment(this.props.dateTime).format('LLLL')}`}
                        {" "}
                        {this.renderPanelLabel()}
                    </div>
                    <div className="pull-right">
                        {this.renderOpenCloseButton()}
                    </div>
                </div>
                <div className="panel-body">
                    <ReactMarkdown source={this.props.text}/>
                </div>
            </div>
        );
    }
}