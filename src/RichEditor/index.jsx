import React, {Component} from 'react';

import {EditorState, convertFromHTML, ContentState, CompositeDecorator, Entity} from 'draft-js';
import Editor, {createEditorStateWithText, composeDecorators } from 'draft-js-plugins-editor';
import {stateToHTML} from 'draft-js-export-html';
// import {stateFromHTML} from 'draft-js-import-html';

import createToolbarPlugin, {Separator} from 'draft-js-static-toolbar-plugin';
import {
    ItalicButton,
    BoldButton,
    UnderlineButton,
    CodeButton,
    HeadlineOneButton,
    HeadlineTwoButton,
    HeadlineThreeButton,
    UnorderedListButton,
    OrderedListButton,
    BlockquoteButton,
    CodeBlockButton,
} from 'draft-js-buttons';

import createImagePlugin from 'draft-js-image-plugin';
import createAlignmentPlugin from 'draft-js-alignment-plugin';
import createResizeablePlugin from 'draft-js-resizeable-plugin';
import createFocusPlugin from 'draft-js-focus-plugin';
import createBlockDndPlugin from 'draft-js-drag-n-drop-plugin';
import createEmojiPlugin from 'draft-js-emoji-plugin';
// import createDragNDropUploadPlugin from 'draft-js-drag-n-drop-upload-plugin';


import '../../node_modules/draft-js-image-plugin/lib/plugin.css';
import '../../node_modules/draft-js-alignment-plugin/lib/plugin.css'
import '../../node_modules/draft-js-static-toolbar-plugin/lib/plugin.css';
// import '../../node_modules/draft-js-resizeable-plugin/lib/plu';
import '../../node_modules/draft-js-emoji-plugin/lib/plugin.css';
import './index.css';
import decorators from './decorators';

const focusPlugin = createFocusPlugin();
const resizeablePlugin = createResizeablePlugin();
const blockDndPlugin = createBlockDndPlugin();
const alignmentPlugin = createAlignmentPlugin();
const emojiPlugin = createEmojiPlugin();
const { AlignmentTool } = alignmentPlugin;
const decorator = composeDecorators(
    resizeablePlugin.decorator,
    alignmentPlugin.decorator,
    focusPlugin.decorator,
    blockDndPlugin.decorator
);
const imagePlugin = createImagePlugin({ decorator });

class ImageButton extends Component {
    onClick = () => {
        let img = 'http://c.hiphotos.baidu.com/image/pic/item/0b55b319ebc4b745b19f82c1c4fc1e178b8215d9.jpg';
        let editorState = imagePlugin.addImage(this.props.getEditorState(), img);
        this.props.setEditorState(editorState)
    };

    render() {
        return (
            <div className="btn-item draftJsToolbar__buttonWrapper__1Dmqh">
                <button onClick={this.onClick}>
                    图片
                </button>
            </div>
        );
    }
}

const toolbarPlugin = createToolbarPlugin({
    structure: [
        BoldButton,
        ItalicButton,
        UnderlineButton,
        CodeButton,
        Separator,
        HeadlineOneButton, HeadlineTwoButton, HeadlineThreeButton,
        UnorderedListButton,
        OrderedListButton,
        BlockquoteButton,
        CodeBlockButton,
        ImageButton
    ]
});
const {Toolbar} = toolbarPlugin;
const plugins = [
    toolbarPlugin,
    blockDndPlugin,
    focusPlugin,
    alignmentPlugin,
    resizeablePlugin,
    imagePlugin,
    emojiPlugin];
const { EmojiSuggestions, EmojiSelect } = emojiPlugin;

export default class CustomToolbarEditor extends Component {
    constructor(props) {
        super(props);

        // 注意, 只支持一次传输html
        const html = this.props.initialValue;
        if(!!html) {
            const blocksFromHTML = convertFromHTML(html);
            if(!!blocksFromHTML.contentBlocks) {
                const state = ContentState.createFromBlockArray(
                    blocksFromHTML.contentBlocks,
                    blocksFromHTML.entityMap,
                );

                let newEditorState = EditorState.createWithContent(state, new CompositeDecorator(decorators)[0]);
                this.state = {editorState: newEditorState};
            }
        }
    }
    state = {
        editorState: createEditorStateWithText('')
    };

    componentDidMount() {
    }

    onChange = (editorState) => {
        this.setState({
            editorState,
        }, () => {
            // 改成html 传出去
            this.props.onChange(stateToHTML(editorState.getCurrentContent()));
        });
    };

    render() {
        let {editorState} = this.state;
        return (
            <div className="editor-page">
                <Editor
                    decorators={decorators}
                    editorState={editorState}
                    onChange={this.onChange}
                    plugins={plugins}
                    ref={(element) => {
                        this.editor = element;
                    }}
                />
                <Toolbar/>
                <AlignmentTool />
                <EmojiSuggestions />
                <div>
                    <EmojiSelect />
                </div>
            </div>
        );
    }
}
const styles = {
    root: {
        fontFamily: '\'Helvetica\', sans-serif',
        padding: 20,
        width: 600,
    },
    editor: {
        border: '1px solid #ccc',
        cursor: 'text',
        minHeight: 80,
        padding: 10,
    },
    button: {
        marginTop: 10,
        textAlign: 'center',
    },
};