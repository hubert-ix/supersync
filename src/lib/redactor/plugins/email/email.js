/*jshint esversion: 6 */
Redactor.add('plugin', 'email', {
    translations: {
        en: {
            "email": {
                "button": "Button",
                "mobile-view": "Mobile view",
                "style-panel": "Style panel",
                "spacing": "Spacing",
                "padding": "Padding",
                "margin-bottom": "Margin bottom",
                "alignment": "Alignment",
                "size-and-color": "Size & color",
                "body": "Body",
                "background": "Background",
                "content": "Content",
                "border-width": "Border width",
                "border-color": "Border color",
                "radius": "Radius",
                "size": "Size",
                "color": "Color",
                "align-left": "Align left",
                "align-center": "Align center",
                "align-right": "Align right"
            }
        }
    },
    defaults: {
        preheader: false,
        options: false,
        style: false,
        doctype: '<!DOCTYPE html>',
        mobileWidth: '420px',
        linkFont: false,
        lang: 'en',
        title: '',
        spacing: '32px',
        gutter: '24px',
        font: 'Helvetica, Arial, sans-serif',
        dark: true,
        body: {
            background: '#ffffff',
            padding: '32px 20px 64px 20px'
        },
        content: {
            width: '600px',
            background: '#ffffff',
            padding: '0',
            borderRadius: false,
            border: false
        },
        text: {
            fontSize: '16px',
            lineHeight: '1.618',
            color: '#333333'
        },
        h1: {
            fontSize: '36px',
            fontWeight: 'bold',
            lineHeight: '1.3',
            letterSpacing: '0',
            textTransform: 'none',
            color: '#000000'
        },
        h2: {
            fontSize: '24px',
            fontWeight: 'bold',
            lineHeight: '1.3',
            letterSpacing: '0',
            textTransform: 'none',
            color: '#000000'
        },
        h3: {
            fontSize: '20px',
            fontWeight: 'bold',
            lineHeight: '1.4',
            letterSpacing: '0',
            textTransform: 'none',
            color: '#000000'
        },
        h4: {
            fontSize: '16px',
            fontWeight: 'bold',
            lineHeight: '1.4',
            letterSpacing: '0',
            textTransform: 'none',
            color: '#000000'
        },
        quote: {
            borderLeft: '2px solid #ccc',
            background: false,
            padding: '0 0 0 24px',
            color: '#000000',
            fontWeight: 'bold',
            fontStyle: 'italic'
        },
        pre: {
            fontFamily: 'monospace',
            fontSize: '14px',
            lineHeight: 1.618,
            padding: '20px',
            borderRadius: false,
            border: false,
            color: '#333333',
            background: '#f5f5f5'
        },
        link: {
            color: '#046BFB'
        },
        button: {
            padding: '16px 0px',
            fontSize: '16px',
            fontWeight: '500',
            background: '#000000',
            color: '#ffffff',
            borderRadius: '8px'
        },
        divider: {
            size: '1px',
            background: '#000000'
        },
        _button: {
            title: '## email.button ##',
            icon: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M5 6C4.73478 6 4.48043 6.10536 4.29289 6.29289C4.10536 6.48043 4 6.73478 4 7V17C4 17.2652 4.10536 17.5196 4.29289 17.7071C4.48043 17.8946 4.73478 18 5 18H19C19.2652 18 19.5196 17.8946 19.7071 17.7071C19.8946 17.5196 20 17.2652 20 17V7C20 6.73478 19.8946 6.48043 19.7071 6.29289C19.5196 6.10536 19.2652 6 19 6H5ZM2.87868 4.87868C3.44129 4.31607 4.20435 4 5 4H19C19.7957 4 20.5587 4.31607 21.1213 4.87868C21.6839 5.44129 22 6.20435 22 7V17C22 17.7957 21.6839 18.5587 21.1213 19.1213C20.5587 19.6839 19.7957 20 19 20H5C4.20435 20 3.44129 19.6839 2.87868 19.1213C2.31607 18.5587 2 17.7956 2 17V7C2 6.20435 2.31607 5.44129 2.87868 4.87868Z"/></svg>',
            position: { after: 'heading' },
            command: 'email.addButton'
        },
        _buttonPreview: {
            title: '## email.mobile-view ##',
            icon: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M8 4C7.73478 4 7.48043 4.10536 7.29289 4.29289C7.10536 4.48043 7 4.73478 7 5V19C7 19.2652 7.10536 19.5196 7.29289 19.7071C7.48043 19.8946 7.73478 20 8 20H16C16.2652 20 16.5196 19.8946 16.7071 19.7071C16.8946 19.5196 17 19.2652 17 19V5C17 4.73478 16.8946 4.48043 16.7071 4.29289C16.5196 4.10536 16.2652 4 16 4H14C14 4.55228 13.5523 5 13 5H11C10.4477 5 10 4.55228 10 4H8ZM5.87868 2.87868C6.44129 2.31607 7.20435 2 8 2H16C16.7956 2 17.5587 2.31607 18.1213 2.87868C18.6839 3.44129 19 4.20435 19 5V19C19 19.7957 18.6839 20.5587 18.1213 21.1213C17.5587 21.6839 16.7957 22 16 22H8C7.20435 22 6.44129 21.6839 5.87868 21.1213C5.31607 20.5587 5 19.7957 5 19V5C5 4.20435 5.31607 3.44129 5.87868 2.87868ZM12 16C12.5523 16 13 16.4477 13 17V17.01C13 17.5623 12.5523 18.01 12 18.01C11.4477 18.01 11 17.5623 11 17.01V17C11 16.4477 11.4477 16 12 16Z"/></svg>',
            position: { after: 'add' },
            command: 'email.showPreview'
        },
        _buttonStyle: {
            title: '## email.style-panel ##',
            icon: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M21.7071 2.2929C21.9282 2.51399 22.0332 2.82575 21.9908 3.13553C21.576 6.1681 20.3501 9.03243 18.4426 11.4262C16.7174 13.5911 14.4924 15.2985 11.9645 16.4051C12.0663 17.2548 11.9485 18.1188 11.6194 18.9134C11.241 19.8271 10.6001 20.608 9.77785 21.1574C8.95561 21.7068 7.98891 22 7 22H3C2.44772 22 2 21.5523 2 21V17C2 16.0111 2.29325 15.0444 2.84265 14.2222C3.39206 13.3999 4.17295 12.759 5.08658 12.3806C5.88121 12.0515 6.74521 11.9337 7.59494 12.0355C8.70148 9.50756 10.4089 7.28262 12.5739 5.55739C14.9676 3.64989 17.8319 2.42403 20.8645 2.00923C21.1743 1.96686 21.486 2.07182 21.7071 2.2929ZM7.7591 14.0976C7.78742 14.1115 7.81664 14.1242 7.84674 14.1355C7.91251 14.1604 7.97926 14.1778 8.04607 14.1883C8.44817 14.3379 8.81533 14.5727 9.12132 14.8787C9.4273 15.1847 9.66209 15.5518 9.81169 15.9539C9.82217 16.0207 9.83962 16.0875 9.86447 16.1533C9.87584 16.1834 9.88851 16.2127 9.90239 16.241C9.9174 16.2984 9.93074 16.3563 9.94236 16.4147C10.0581 16.9967 9.9987 17.5999 9.77164 18.1481C9.54458 18.6962 9.16006 19.1648 8.66671 19.4944C8.17336 19.8241 7.59334 20 7 20H4V17C4 16.4067 4.17595 15.8266 4.50559 15.3333C4.83524 14.84 5.30377 14.4554 5.85195 14.2284C6.40013 14.0013 7.00333 13.9419 7.58527 14.0577C7.64372 14.0693 7.70168 14.0826 7.7591 14.0976ZM11.3293 14.4987C11.1122 14.1228 10.8458 13.7748 10.5355 13.4645C10.2253 13.1542 9.87725 12.8878 9.50135 12.6707C9.88304 11.8268 10.3411 11.0223 10.8685 10.2667C12.0533 10.9599 13.0401 11.9467 13.7333 13.1315C12.9777 13.6589 12.1732 14.117 11.3293 14.4987ZM15.3062 11.8681C15.8708 11.3484 16.3967 10.7843 16.8785 10.1798C18.2688 8.43509 19.2487 6.40712 19.7538 4.24619C17.5929 4.75135 15.5649 5.73124 13.8203 7.12151C13.2157 7.60328 12.6516 8.12921 12.1319 8.6938C13.4167 9.49756 14.5024 10.5833 15.3062 11.8681Z"/></svg>',
            position: { after: 'add' },
            command: 'email.popupStyle'
        },
        _buttonSpacing: {
            title: '## email.spacing ##',
            icon: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M4 3C4.55228 3 5 3.44772 5 4V4.01C5 4.56229 4.55228 5.01 4 5.01C3.44772 5.01 3 4.56229 3 4.01V4C3 3.44772 3.44772 3 4 3ZM8 3C8.55228 3 9 3.44772 9 4V4.01C9 4.56229 8.55228 5.01 8 5.01C7.44772 5.01 7 4.56229 7 4.01V4C7 3.44772 7.44772 3 8 3ZM12 3C12.5523 3 13 3.44772 13 4V4.01C13 4.56229 12.5523 5.01 12 5.01C11.4477 5.01 11 4.56229 11 4.01V4C11 3.44772 11.4477 3 12 3ZM16 3C16.5523 3 17 3.44772 17 4V4.01C17 4.56229 16.5523 5.01 16 5.01C15.4477 5.01 15 4.56229 15 4.01V4C15 3.44772 15.4477 3 16 3ZM20 3C20.5523 3 21 3.44772 21 4V4.01C21 4.56229 20.5523 5.01 20 5.01C19.4477 5.01 19 4.56229 19 4.01V4C19 3.44772 19.4477 3 20 3ZM4 7C4.55228 7 5 7.44772 5 8V8.01C5 8.56228 4.55228 9.01 4 9.01C3.44772 9.01 3 8.56228 3 8.01V8C3 7.44772 3.44772 7 4 7ZM7 8C7 7.44772 7.44772 7 8 7H16C16.5523 7 17 7.44772 17 8V16C17 16.5523 16.5523 17 16 17H8C7.44772 17 7 16.5523 7 16V8ZM9 9V15H15V9H9ZM20 7C20.5523 7 21 7.44772 21 8V8.01C21 8.56228 20.5523 9.01 20 9.01C19.4477 9.01 19 8.56228 19 8.01V8C19 7.44772 19.4477 7 20 7ZM4 11C4.55228 11 5 11.4477 5 12V12.01C5 12.5623 4.55228 13.01 4 13.01C3.44772 13.01 3 12.5623 3 12.01V12C3 11.4477 3.44772 11 4 11ZM20 11C20.5523 11 21 11.4477 21 12V12.01C21 12.5623 20.5523 13.01 20 13.01C19.4477 13.01 19 12.5623 19 12.01V12C19 11.4477 19.4477 11 20 11ZM4 15C4.55228 15 5 15.4477 5 16V16.01C5 16.5623 4.55228 17.01 4 17.01C3.44772 17.01 3 16.5623 3 16.01V16C3 15.4477 3.44772 15 4 15ZM20 15C20.5523 15 21 15.4477 21 16V16.01C21 16.5623 20.5523 17.01 20 17.01C19.4477 17.01 19 16.5623 19 16.01V16C19 15.4477 19.4477 15 20 15ZM4 19C4.55228 19 5 19.4477 5 20V20.01C5 20.5623 4.55228 21.01 4 21.01C3.44772 21.01 3 20.5623 3 20.01V20C3 19.4477 3.44772 19 4 19ZM8 19C8.55228 19 9 19.4477 9 20V20.01C9 20.5623 8.55228 21.01 8 21.01C7.44772 21.01 7 20.5623 7 20.01V20C7 19.4477 7.44772 19 8 19ZM12 19C12.5523 19 13 19.4477 13 20V20.01C13 20.5623 12.5523 21.01 12 21.01C11.4477 21.01 11 20.5623 11 20.01V20C11 19.4477 11.4477 19 12 19ZM16 19C16.5523 19 17 19.4477 17 20V20.01C17 20.5623 16.5523 21.01 16 21.01C15.4477 21.01 15 20.5623 15 20.01V20C15 19.4477 15.4477 19 16 19ZM20 19C20.5523 19 21 19.4477 21 20V20.01C21 20.5623 20.5523 21.01 20 21.01C19.4477 21.01 19 20.5623 19 20.01V20C19 19.4477 19.4477 19 20 19Z"/></svg>',
            position: { before: ['duplicate', 'trash'] },
            command: 'email.popupSpacing'
        },
        _buttonImageAlign: {
            title: '## email.alignment ##',
            icon: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M8.58579 4.58579C8.96086 4.21071 9.46957 4 10 4H14C14.5304 4 15.0391 4.21071 15.4142 4.58579C15.7893 4.96086 16 5.46957 16 6V10C16 10.5304 15.7893 11.0391 15.4142 11.4142C15.0391 11.7893 14.5304 12 14 12H10C9.46957 12 8.96086 11.7893 8.58579 11.4142C8.21071 11.0391 8 10.5304 8 10V6C8 5.46957 8.21071 4.96086 8.58579 4.58579ZM14 6L10 6V10H14V6ZM3 7C3 6.44772 3.44772 6 4 6H5C5.55228 6 6 6.44772 6 7C6 7.55228 5.55228 8 5 8H4C3.44772 8 3 7.55228 3 7ZM18 7C18 6.44772 18.4477 6 19 6H20C20.5523 6 21 6.44772 21 7C21 7.55228 20.5523 8 20 8H19C18.4477 8 18 7.55228 18 7ZM3 11C3 10.4477 3.44772 10 4 10H5C5.55228 10 6 10.4477 6 11C6 11.5523 5.55228 12 5 12H4C3.44772 12 3 11.5523 3 11ZM18 11C18 10.4477 18.4477 10 19 10H20C20.5523 10 21 10.4477 21 11C21 11.5523 20.5523 12 20 12H19C18.4477 12 18 11.5523 18 11ZM3 15C3 14.4477 3.44772 14 4 14H20C20.5523 14 21 14.4477 21 15C21 15.5523 20.5523 16 20 16H4C3.44772 16 3 15.5523 3 15ZM3 19C3 18.4477 3.44772 18 4 18H20C20.5523 18 21 18.4477 21 19C21 19.5523 20.5523 20 20 20H4C3.44772 20 3 19.5523 3 19Z"/></svg>',
            position: { before: ['duplicate', 'trash'] },
            command: 'email.popupImageAlign',
            blocks: { types: ['image'] }
        },
        _buttonLine: {
            title: '## email.size-and-color ##',
            icon: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M6 3C6.55228 3 7 3.44772 7 4V7.17157C7.4179 7.31933 7.80192 7.55928 8.12132 7.87868C8.68393 8.44129 9 9.20435 9 10C9 10.7956 8.68393 11.5587 8.12132 12.1213C7.80192 12.4407 7.4179 12.6807 7 12.8284V20C7 20.5523 6.55228 21 6 21C5.44772 21 5 20.5523 5 20V12.8284C4.5821 12.6807 4.19808 12.4407 3.87868 12.1213C3.31607 11.5587 3 10.7956 3 10C3 9.20435 3.31607 8.44129 3.87868 7.87868C4.19808 7.55928 4.5821 7.31933 5 7.17157V4C5 3.44772 5.44772 3 6 3ZM12 3C12.5523 3 13 3.44772 13 4V13.1716C13.4179 13.3193 13.8019 13.5593 14.1213 13.8787C14.6839 14.4413 15 15.2043 15 16C15 16.7957 14.6839 17.5587 14.1213 18.1213C13.8019 18.4407 13.4179 18.6807 13 18.8284V20C13 20.5523 12.5523 21 12 21C11.4477 21 11 20.5523 11 20V18.8284C10.5821 18.6807 10.1981 18.4407 9.87868 18.1213C9.31607 17.5587 9 16.7957 9 16C9 15.2043 9.31607 14.4413 9.87868 13.8787C10.1981 13.5593 10.5821 13.3193 11 13.1716V4C11 3.44772 11.4477 3 12 3ZM18 3C18.5523 3 19 3.44772 19 4V4.17157C19.4179 4.31933 19.8019 4.55927 20.1213 4.87868C20.6839 5.44129 21 6.20435 21 7C21 7.79565 20.6839 8.55871 20.1213 9.12132C19.8019 9.44072 19.4179 9.68067 19 9.82843V20C19 20.5523 18.5523 21 18 21C17.4477 21 17 20.5523 17 20V9.82843C16.5821 9.68067 16.1981 9.44072 15.8787 9.12132C15.3161 8.55871 15 7.79565 15 7C15 6.20435 15.3161 5.44129 15.8787 4.87868C16.1981 4.55927 16.5821 4.31933 17 4.17157V4C17 3.44772 17.4477 3 18 3ZM18 6C17.7348 6 17.4804 6.10536 17.2929 6.29289C17.1054 6.48043 17 6.73478 17 7C17 7.26522 17.1054 7.51957 17.2929 7.70711C17.4804 7.89464 17.7348 8 18 8C18.2652 8 18.5196 7.89464 18.7071 7.70711C18.8946 7.51957 19 7.26522 19 7C19 6.73478 18.8946 6.48043 18.7071 6.29289C18.5196 6.10536 18.2652 6 18 6ZM6 9C5.73478 9 5.48043 9.10536 5.29289 9.29289C5.10536 9.48043 5 9.73478 5 10C5 10.2652 5.10536 10.5196 5.29289 10.7071C5.48043 10.8946 5.73478 11 6 11C6.26522 11 6.51957 10.8946 6.70711 10.7071C6.89464 10.5196 7 10.2652 7 10C7 9.73478 6.89464 9.48043 6.70711 9.29289C6.51957 9.10536 6.26522 9 6 9ZM12 15C11.7348 15 11.4804 15.1054 11.2929 15.2929C11.1054 15.4804 11 15.7348 11 16C11 16.2652 11.1054 16.5196 11.2929 16.7071C11.4804 16.8946 11.7348 17 12 17C12.2652 17 12.5196 16.8946 12.7071 16.7071C12.8946 16.5196 13 16.2652 13 16C13 15.7348 12.8946 15.4804 12.7071 15.2929C12.5196 15.1054 12.2652 15 12 15Z"/></svg>',
            position: { before: ['duplicate', 'trash'] },
            command: 'email.popupLine',
            blocks: { types: ['line'] }
        },
        _headStyle: '* { margin: 0; } table, td{mso-table-lspace:0pt; mso-table-rspace:0pt;} pre { white-space: pre-wrap; word-wrap: break-word; } .email-column-container { table-layout: fixed; width: 100%; } .email-column { vertical-align: top; } @media screen and (max-width: 500px) { .email-container { width: 100% !important; } .email-column, .email-column-spacer { width: 100% !important; display: block; } .email-column-spacer { height: ===gutter===; } .mobile-center {text-align: center !important; } .mobile-right { text-align: right !important; } .mobile-left { text-align: left !important; } .mobile-hidden { max-height: 0; display: none !important; mso-hide: all; overflow: hidden; } }',
        _darkStyle: '@media screen and (prefers-color-scheme: dark) { body, table, .email-content { background: #0F1721 !important; } .email-wrapper td { background: #1B232C !important; } .email-link { color: #66BFFF !important; text-decoration-color: #66BFFF !important; } h1, h2, h3, h4, h5, h6 { color: #E7E8E9 !important; } p, ul, ol, span { color: #CFD1D3 !important; } quote, pre { color: #CFD1D3 !important; } }'
    },
    subscribe: {
        'editor.insert, format.set, state.undo, state.redo': function(event) {
            this.parseLayout(event);
        },
        'editor.set': function(event) {
            this.parseLayout(event);
            this._build();
        },
        'blockbackground.set, blockcolor.set': function(event) {
            return this.setColor(event);
        },
        'blockfontsize.set': function(event) {
            return this.setFontSize(event);
        },
        'blockbackground.get, blockcolor.get': function(event) {
            return this.getColor(event);
        },
        'blockfontsize.get': function(event) {
            return this.getFontSize(event);
        },
        'blockborder.set': function(event) {
            return this.setBorder(event);
        },
        'blockborder.get': function(event) {
            return this.getBorder(event);
        },
        'format.before.set': function(event) {
            return this._beforeFormat(event);
        }
    },
    start() {
        this.app.addbar.add('button', this.defaults._button);

        this.app.toolbar.add('style-panel', this.defaults._buttonStyle);
        this.app.toolbar.add('preview', this.defaults._buttonPreview);

        this.app.control.add('imagealign', this.defaults._buttonImageAlign);
        this.app.control.add('spacing', this.defaults._buttonSpacing);
        this.app.control.add('line-setting', this.defaults._buttonLine);

        this.app.toolbar.remove(['todo', 'embed']);
        this.app.addbar.remove(['todo', 'embed']);
        this.app.control.remove(['outset', 'wrap']);
        this.app.format.remove(['todo']);

        // body & main
        this.$main = this.app.editor.getEditor();
        this.$cont = this.app.container.get('editor');
        this.$main.addClass('rx-editor-email');

        // build
        this._build();
    },
    load() {
        this.app.editor.getEditor().find('img').each(function($node) {
            $node.one('load', function() {
                $node.attr({
                    'width': $node.width(),
                    'height': $node.height()
                });
            });
        });
    },
    popupSpacing(e, button) {
        let instance = this.app.block.get();
        let $block = instance.getBlock();
        let $btn = $block.children().first();
        let isButton = $btn.hasClass('email-button');
        let data = {
            padding: (isButton) ? $btn.css('padding') : $block.css('padding'),
            margin: parseInt($block.css('margin-bottom'))
        };

        let form = this.app.create('form');
        let items = {
            padding: { type: 'input', label: '## email.padding ##' },
            margin: { type: 'number', width: '80px', label: '## email.margin-bottom ##'  }
        };
        if (instance.isType('line')) {
            delete items.padding;
        }

        form.create({
            title: '## email.spacing ##',
            width: '240px',
            data: data,
            setter: 'email.saveSpacing',
            items: items
        });
        form.setData(data);


        let dropdown = this.app.create('dropdown', 'spacing', { html: form.getElement() });
        this.app.dropdown.open(e, button, dropdown);
    },
    popupStyle(e, button) {
        let utils = this.app.create('utils');
        let bodyCss = utils.cssToObject(this.$cont.attr('style'));
        let mainCss = utils.cssToObject(this.$main.attr('style'));
        let borderWidth = false;
        let borderColor = '';

        if (mainCss.border) {
            let arr = mainCss.border.split(' ');
            borderWidth = parseInt(arr[0]);
            borderColor = arr[2];
        }
        let data = {
            bodypadding: this.$cont.css('padding'),
            bodycolor: bodyCss.background,
            mainpadding: this.$main.css('padding'),
            maincolor: mainCss.background,
            mainborderwidth: borderWidth,
            mainborderradius: parseInt(this.$main.css('border-radius')),
            mainbordercolor: borderColor
        };
        let form = this.app.create('form');
        form.create({
            width: '240px',
            data: data,
            setter: 'email.saveStyle',
            items: {
                sectionbody: { title: '## email.body ##' },
                bodypadding: { type: 'input', label: '## email.padding ##' },
                bodycolor: { type: 'color', label: '## email.background ##' },
                sectionmain: { title: '## email.content ##' },
                mainpadding: { type: 'input', label: '## email.padding ##' },
                maincolor: { type: 'color', label: '## email.background ##' },
                flex: {
                    mainborderwidth: { type: 'number', label: '## email.border-width ##' },
                    mainborderradius: { type: 'number', label: '## email.radius ##'  }
                },
                mainbordercolor: { type: 'color', label: '## email.border-color ##' }
            }
        });
        form.setData(data);


        let dropdown = this.app.create('dropdown', 'email', { html: form.getElement() });
        this.app.dropdown.open(e, button, dropdown);
    },
    popupLine(e, button) {
        let instance = this.app.block.get();
        let utils = this.app.create('utils');
        let $block = instance.getBlock();
        let css = utils.cssToObject($block.attr('style'));

        let data = {
            size: parseInt(css.height),
            color: css.background
        };

        let form = this.app.create('form');
        form.create({
            title: '## email.size-and-color ##',
            width: '240px',
            data: data,
            setter: 'email.saveLine',
            items: {
                size: { type: 'number', label: '## email.size ##' },
                color: { type: 'color', label: '## email.color ##' },
            }
        });
        form.setData(data);

        let dropdown = this.app.create('dropdown', 'line-setting', { html: form.getElement() });
        this.app.dropdown.open(e, button, dropdown);
    },
    popupImageAlign(e, button) {
        let instance = this.app.block.get();
        let css = instance.getStyle();
        let buttons = {
                left: { title: '## email.align-left ##', command: 'email.saveImageAlign'},
                center: { title: '## email.align-center ##', command: 'email.saveImageAlign'},
                right: { title: '## email.align-right ##', command: 'email.saveImageAlign'}
            };
        if (css['text-align']) {
            buttons[css['text-align']].active = true;
        }

        let dropdown = this.app.create('dropdown', 'imagealign', { items: buttons });
        this.app.dropdown.open(e, button, dropdown);
    },

    // save
    saveSpacing(form) {
        let cleaner = this.app.create('cleaner');
        let instance = this.app.block.get();
        let data = form.getData();
        let $block = instance.getBlock();
        let $btn = $block.children().first();
        let isButton = $btn.hasClass('email-button');

        if (isButton) {
            instance.setStyle({ 'margin-bottom': data.margin + 'px' });
            $btn.css({ 'padding': data.padding });
            cleaner.cacheElementStyle($btn);
        }
        else {
            instance.setStyle({ 'margin-bottom': data.margin + 'px', 'padding': data.padding });
        }
    },
    saveStyle(form) {
        let data = form.getData();
        let radius = (data.mainborderradius === '0' || data.mainborderradius === '') ? '' : data.mainborderradius + 'px';
        let border = (data.mainborderwidth === '0') ? '' : data.mainborderwidth + 'px solid ' + data.mainbordercolor;

        this.$main.css({ 'border': border, 'border-radius': radius, 'padding': data.mainpadding, 'background': data.maincolor });
        this.$cont.css({ 'padding': data.bodypadding, 'background': data.bodycolor });

        let options = this.opts.get('email.options');
        if (options) {
            let jsonObject = JSON.parse(options);
            let obj = {
                "body": {
                    "background": data.bodycolor,
                    "padding": data.bodypadding
                },
                "content": {
                    "padding": data.mainpadding,
                    "border": border,
                    "borderRadius": radius,
                    "background": data.maincolor
                }
            };

            // merge
            jsonObject = {...jsonObject, ...obj};
            options = jsonObject;
        }
        else {
            options = `{
                "body": {
                    "background": "${data.bodycolor}",
                    "padding": "${data.bodypadding}"
                },
                "content": {
                    "padding": "${data.mainpadding}",
                    "border": "${border}",
                    "borderRadius": "${radius}",
                    "background": "${data.maincolor}"
                }
            }`;

            options = JSON.parse(options);
        }

        // updated options
        this.opts.set('email.options', JSON.stringify(options, null, 4));

    },
    saveLine(form) {
        let instance = this.app.block.get();
        let data = form.getData();

        instance.setStyle({ 'height': data.size + 'px', 'background': data.color });
    },
    saveImageAlign(params, button, name) {
        this.app.dropdown.close();

        let instance = this.app.block.get();
        instance.setStyle({ 'text-align': name });

        // broadcast
        this.app.broadcast('image.position');
    },

    // set
    setFontSize(event) {
        let data = event.get('data');
        let cleaner = this.app.create('cleaner');
        let instance = this.app.block.get();
        let $block = instance.getBlock();
        let $btn = $block.children().first();
        let isButton = $btn.hasClass('email-button');

        if (isButton) {
            event.stop();
            $btn.css({ 'font-size': data.size + 'px', 'line-height': data.line });
            cleaner.cacheElementStyle($btn);
        }
    },
    setColor(event) {
        let data = event.get('style');
        let cleaner = this.app.create('cleaner');
        let instance = this.app.block.get();
        let $block = instance.getBlock();
        let $btn = $block.children().first();
        let isButton = $btn.hasClass('email-button');

        if (isButton) {
            event.stop();
            $btn.css(data);
            cleaner.cacheElementStyle($btn);
        }
    },
    setBorder(event) {
        let data = event.get('data');
        let cleaner = this.app.create('cleaner');
        let instance = this.app.block.get();
        let $block = instance.getBlock();
        let $btn = $block.children().first();
        let isButton = $btn.hasClass('email-button');

        if (isButton) {
            event.stop();
            $btn.css({ 'border-radius': data.radius, 'border': data.border  });
            cleaner.cacheElementStyle($btn);
        }
    },

    // get
    getFontSize(event) {
        let utils = this.app.create('utils');
        let instance = this.app.block.get();
        let $block = instance.getBlock();
        let $btn = $block.children().first();
        let isButton = $btn.hasClass('email-button');
        let $target = (isButton) ? $btn : $block;
        let css = utils.cssToObject($target.attr('style'));

        event.set('data', {
            size: (css['font-size']) ? parseInt(css['font-size']) : parseInt(this.opts.get('email.text.fontSize')),
            line: (css['line-height']) ? css['line-height'] : this.opts.get('email.text.lineHeight')
        });

        return event;
    },
    getBorder(event) {
        let utils = this.app.create('utils');
        let instance = this.app.block.get();
        let $block = instance.getBlock();
        let $btn = $block.children().first();
        let isButton = $btn.hasClass('email-button');
        let css = utils.cssToObject($block.attr('style'));
        let borderWidth = false;
        let borderColor = '';
        if (isButton) {
            css = utils.cssToObject($btn.attr('style'));
        }

        if (css.border) {
            let arr = css.border.split(' ');
            borderWidth = parseInt(arr[0]);
            borderColor = arr[2];
        }

        event.set('data', {
            width: borderWidth,
            color: borderColor,
            radius: parseInt(css['border-radius'])
        });

        return event;
    },
    getColor(event) {
        let utils = this.app.create('utils');
        let instance = this.app.block.get();
        let $block = instance.getBlock();
        let $btn = $block.children().first();
        let isButton = $btn.hasClass('email-button');
        let css = utils.cssToObject($block.attr('style'));

        if (isButton) {
            css = utils.cssToObject($btn.attr('style'));
        }

        event.set('style', { color: css.color, background: css.background });

        return event;

    },
    getEmail(cleanup) {
        let $html = this._buildHtmlEmail();
        let $head = this._buildHeadEmail($html);
        let $body = this._buildBodyEmail($html);
        let $cell = this._buildContainerEmail($body);
        let $target = this._buildMainEmail($cell);

        // build content
        this._buildContentEmail($target);

        // preheader
        this._buildPreheaderEmail($body);

        // doctype
        let doctype = this.opts.get('email.doctype');

        // google font
        this._buildFontLink($head);

        let code = doctype + $html.get().outerHTML;
        if (cleanup) {
            let tidy = this.app.create('tidy');
            code = tidy.parse(code, 'email');
        }

        let utils = this.app.create('utils');
        code = utils.replaceRgbToHex(code);
        code = code.replace(/&quot;(.*?)&quot;/gi, "'$1'");

        return code;
    },
    getContent() {
        let html = this.app.editor.getEditor().html();
        html = this.unparse(html);
        html = this.unparseBlocks(html);

        return html;
    },

    // button
    addButton() {
        this.app.dropdown.close();

        let insertion = this.app.create('insertion');
        let wrapper = this.app.block.create();
        let $btn = this.dom('<a href="#">');
        $btn.addClass('email-button');
        $btn.html(this.lang.parse('## email.button ##'));

        // add to wrapper
        wrapper.getBlock().append($btn);

        // insert
        insertion.insert({ instance: wrapper });
    },

    // preview
    showPreview() {
        if (this.$preview) {
            return this.hidePreview();
        }

        this.app.blocks.unset();
        this.app.block.unset();
        this.app.editor.unsetSelectAll();

        // ui
        this.app.broadcast('ui.close');
        this.app.broadcast('ui.disable');
        this.app.toolbar.setToggled('preview');

        // html
        let html = this.getEmail();

        // hide
        this.$preview = this.app.container.get('preview');
        this.app.container.get('editor').hide();

        let $iframe = this.dom('<iframe>');
        $iframe.attr('scrolling', 'no');
        $iframe.css({
            'border': '1px solid var(--rx-border-dark-subtle)',
            'width': this.defaults.mobileWidth,
            'border-radius': '12px',
            'margin': '0 auto',
            'background': 'var(--rx-bg-raised)'
        });

        this.$preview.css({ 'background': 'var(--rx-bg-aluminum)', 'padding': '24px 0 40px 0' });
        this.$preview.html('');
        this.$preview.append($iframe);

        let doc = $iframe.get().contentWindow.document;

        // write html
        doc.open();
        doc.write(html);
        doc.close();

        this.$preview.show();

        let iframe = $iframe.get();
        let doc2 = iframe.contentDocument || iframe.contentWindow;
        if (doc2.document) doc2 = doc2.document;
        let _timer = setInterval(function() {
            if (doc2.readyState == 'complete') {
                clearInterval(_timer);
                // on load
                this._setFrameHeight($iframe);
                setTimeout(function() {
                  this._setFrameHeight($iframe);
                }.bind(this), 200);
            }
        }.bind(this), 100);
    },
    hidePreview() {
        this.$preview = false;

        this.app.container.get('preview').hide();
        this.app.container.get('editor').show();

        // ui
        this.app.broadcast('ui.enable');
        this.app.toolbar.unsetToggled('preview');
    },

    // parse
    parse($layout) {
        this._buildOptions();

        $layout.find('a').each(this._setLinkStyle.bind(this));
        $layout.find('.email-button').each(this._setButtonStyle.bind(this));
        $layout.find('[data-rx-type=heading]').each(this._setHeadingStyle.bind(this));
        $layout.find('[data-rx-type=image]').each(this._setImageStyle.bind(this));
        $layout.find('hr').each(this._setDividerStyle.bind(this));
        $layout.find('[data-rx-type=list]').each(this._setListStyle.bind(this));

        return $layout;
    },
    parseLayout(event) {
        this.parse(this.$main);
        this._buildSpacing();
    },
    parseBlocks(html) {
        let utils = this.app.create('utils');
        let map = ['preheader', 'options', 'style'];
        html = utils.wrap(html, function($w) {
            for (let i = 0; i < map.length; i++) {
                $w.find('.email-' + map[i]).each(function($node) {
                    this.opts.set('email.' + map[i], $node.html());
                    $node.remove();
                }.bind(this));
            }
        }.bind(this));

        return html;
    },
    unparse(html) {
        let utils = this.app.create('utils');
        let spacing = this.opts.get('email.spacing');
        html = utils.wrap(html, function($w) {
            $w.find('.email-button').each(this._unparseButton.bind(this));
            $w.find('hr').each(this._unparseDivider.bind(this));
            $w.find('h1, h2, h3, h4, h5, h6').each(this._unparseHeading.bind(this));
            $w.find('ul, ol').each(this._unparseList.bind(this));
            $w.children().each(function($node) {
                let css = utils.cssToObject($node.attr('style'));
                $node.css('margin-bottom', (css['margin-bottom'] && css['margin-bottom'] === spacing) ? '' : css['margin-bottom']);
                if ($node.attr('style') === '') {
                    $node.removeAttr('style');
                }
            }.bind(this));
        }.bind(this));

        return html;
    },
    unparseBlocks(html) {
        let map = ['preheader', 'options', 'style'];
        let block = '';
        let value;
        for (let i = 0; i < map.length; i++) {
            value = this.opts.get('email.' + map[i]);
            if (value) {
                block = '<div class="email-' + map[i] + '">' + value + '</div>\r\n';
                html = block + html;
            }
        }

        return html;
    },

    // =private
    _unparseList($node) {
        $node.css({
            'list-style-type': '',
            'margin-left': ''
        });
    },
    _unparseHeading($node) {
        let utils = this.app.create('utils');
        let css = utils.cssToObject($node.attr('style'));
        let tag = $node.get().tagName.toLowerCase();

        $node.css({
            'font-size': (css['font-size'] === this.opts.get('email.' + tag + '.fontSize')) ? '' : css['font-size'],
            'font-weight': (css['font-weight'] === this.opts.get('email.' + tag + '.fontWeight')) ? '' : css['font-weight'],
            'line-height': (css['line-height'] === this.opts.get('email.' + tag + '.lineHeight')) ? '' : css['line-height'],
            'color': (css.color === this.opts.get('email.' + tag + '.color')) ? '' : css.color,
        });
    },
    _unparseDivider($node) {
        let utils = this.app.create('utils');
        let css = utils.cssToObject($node.attr('style'));

        $node.css({
            'margin-top': '',
            'padding': '',
            'border': '',
            'background': (css.background === this.opts.get('email.divider.background')) ? '' : css.background,
            'height': (css.height === this.opts.get('email.divider.size')) ? '' : css.height
        });
    },
    _unparseButton($node) {
        let utils = this.app.create('utils');
        let css = utils.cssToObject($node.attr('style'));

        $node.css({
            'cursor': '',
            'text-decoration': '',
            'text-align': '',
            'width': '',
            'margin': '',
            'display': '',
            'line-height': '',
            'font-family': '',

            'font-size': (css['font-size'] === this.opts.get('email.button.fontSize')) ? '' : css['font-size'],
            'font-weight': (css['font-weight'] === this.opts.get('email.button.fontWeight')) ? '' : css['font-weight'],
            'padding': (css.padding === this.opts.get('email.button.padding')) ? '' : css.padding,
            'background': (css.background === this.opts.get('email.button.background')) ? '' : css.background,
            'color': (css.color === this.opts.get('email.button.color')) ? '' : css.color,
            'border-radius': (css['border-radius'] === this.opts.get('email.button.borderRadius')) ? '' : css['border-radius']
        });
    },

    _setLinkStyle($node) {
        if ($node.hasClass('email-button') || $node.find('img').length !== 0) return;

        let linkStyle = this.opts.get('email.link');
        this._setStyle($node, linkStyle);
        this._cacheStyle($node);
    },
    _setButtonStyle($node) {
        let buttonStyle = this.opts.get('email.button');
        this._setStyle($node, buttonStyle);
        $node.css({
            'cursor': 'pointer',
            'line-height': '1',
            'text-decoration': 'none',
            'text-align': 'center',
            'width': '100%',
            'margin': '0',
            'display': 'block'
        });

        this._setFontFamily($node);
        this._cacheStyle($node);
    },
    _setHeadingStyle($node) {
        let tag = $node.get().tagName.toLowerCase();
        let headingStyle = this.opts.get('email.' + tag);

        this._setStyle($node, headingStyle);
        this._cacheStyle($node);
    },
    _setDividerStyle($node) {
        let utils = this.app.create('utils');
        let css = utils.cssToObject($node.attr('style'));
        let size = (css.height) ? css.height : this.opts.get('email.divider.size');
        let background = (css.background) ? css.background : this.opts.get('email.divider.background');

        $node.css({
            'margin-top': '0',
            'padding': '0',
            'border': 'none',
            'height': size,
            'background': background
        });
        this._cacheStyle($node);
    },
    _setListStyle($node) {
        let tag = $node.get().tagName.toLowerCase();
        let type = (tag === 'ul') ? 'disc' : 'decimal';

        $node.css('list-style-type', type);
        this._cacheStyle($node);
    },
    _setImageStyle($node) {
        let utils = this.app.create('utils');
        let css = utils.cssToObject($node.attr('style'));

        $node.css('text-align', (css['text-align']) ? css['text-align'] : 'center');
    },
    _setFontFamily($node) {
        $node.css('font-family', this.opts.get('email.font'));
    },

    // build
    _build() {
        this._buildBody();
        this._buildMain();
        this._buildSpacing();
    },
    _buildOptions() {
        let options = this.opts.get('email.options');
        if (options) {
            options = options.trim();
            let obj = JSON.parse(options);
            this.opts.set('email', Redactor.extend(true, this.opts.get('email'), obj));
        }
    },
    _buildBody() {
        let style = this.opts.get('email.body'),
            utils = this.app.create('utils'),
            obj = utils.cssToObject(this.$cont.attr('style'));

        this.$cont.css(style);

        // defaults text styles
        this.$cont.css({
            fontFamily: (obj['font-family']) ? obj['font-family'] : this.opts.get('email.font'),
            fontSize: (obj['font-size']) ? obj['font-size'] : this.opts.get('email.text.fontSize'),
            lineHeight: (obj['line-height']) ? obj['line-height'] : this.opts.get('email.text.lineHeight'),
            color: (obj.color) ? obj.color : this.opts.get('email.text.color')
        });

    },
    _buildMain() {
        let style = this.opts.get('email.content');

        this.$main.css(style);
        this.$main.removeClass(this.opts.get('classname'));
    },
    _buildSpacing() {
        let $blocks = this.app.blocks.get({ firstLevel: true });
        let utils = this.app.create('utils');
        let count = $blocks.length;
        $blocks.each(function($node, i) {
            if (count !== i+1) {
                let css = utils.cssToObject($node.attr('style'));
                $node.css('margin-bottom', (css['margin-bottom']) ? css['margin-bottom'] : this.opts.get('email.spacing'));
                this._cacheStyle($node);
            }
        }.bind(this));
    },

    // html build
    _buildMarginBottom($node, css) {
        if ($node.hasClass('email-wrapper') || $node.hasClass('email-footer')) {
            return (css['margin-bottom']) ? css['margin-bottom'] : this.opts.get('email.spacing');
        }

        return ($node.closest('[data-block=column], .email-wrapper, .email-footer').length !== 0) ? 0 : this.opts.get('email.spacing');
    },
    _buildHtmlEmail() {
        let $html = this.dom('<html>');
        $html.attr('xmlns', 'http://www.w3.org/1999/xhtml');
        $html.attr('lang', this.opts.get('email.lang'));

        return $html;
    },
    _buildHeadEmail($html) {
        let $head = this.dom('<head>');
        let $meta = this.dom('<meta charset="UTF-8">');
        $head.append($meta);

        if (this.opts.is('email.dark')) {
            let $darkMeta = this.dom('<meta name="color-scheme" content="light dark">');
            $head.append($darkMeta);
        }

        let $title = this.dom('<title>');
        $title.text(this.opts.get('email.title'));
        $head.append($title);

        let $style = this.dom('<style type="text/css">');
        let headStyle = this.opts.get('email._headStyle');
        headStyle = headStyle.replace(new RegExp('===spacing===', 'gi'), this.opts.get('email.spacing'));
        headStyle = headStyle.replace(new RegExp('===gutter===', 'gi'), this.opts.get('email.gutter'));

        let customStyle = this.opts.get('email.style');
        if (customStyle) {
            headStyle = headStyle + customStyle;
        }

        if (this.opts.is('email.dark')) {
            let darkStyle = this.opts.get('email._darkStyle');
            headStyle = headStyle + darkStyle;
        }

        $style.html(headStyle);
        $head.append($style);
        $html.append($head);

        return $head;
    },
    _buildBodyEmail($html) {
        let $body = this.dom('<body>');
        let utils = this.app.create('utils');
        let css = utils.cssToObject(this.$cont.attr('style'));

        $body.css(css);
        $body.css({
            'margin': '0',
            'padding': '0'
        });

        $html.append($body);

        return $body;
    },
    _buildContainerEmail($body) {
        let utils = this.app.create('utils');
        let css = utils.cssToObject(this.$cont.attr('style'));

        let $container = this.dom('<table>');
        $container.attr({
            'cellpadding': '0',
            'cellspacing': '0',
            'width': '100%',
            'role': 'presentation'
        });
        let $row = this.dom('<tr>');
        let $cell = this.dom('<td>');
        $cell.addClass('email-body');
        $cell.attr({
            'align': 'center'
        });
        $cell.css({
            'padding': (css.padding) ? css.padding : this.opts.get('email.body.padding')
        });

        $row.append($cell);
        $container.append($row);
        $body.append($container);

        return $cell;
    },
    _buildMainEmail($target) {
        let utils = this.app.create('utils');
        let css = utils.cssToObject(this.$main.attr('style'));


        let width = this.opts.get('email.content.width');
        let $container = this.dom('<table>');
        $container.addClass('email-container');
        $container.attr({
            'width': (width.search('%') !== -1) ? width : parseInt(width),
            'cellpadding': '0',
            'cellspacing': '0',
            'role': 'presentation'
        });

        let $row = this.dom('<tr>');
        let $cell = this.dom('<td>');
        $cell.addClass('email-content');
        $cell.css({
            'margin': '0',
            'background': (css.background) ? css.background : this.opts.get('email.content.background'),
            'padding': (css.padding) ? css.padding : this.opts.get('email.content.padding'),
            'border': (css.border) ? css.border : this.opts.get('email.content.border'),
            'border-radius': (css['border-radius']) ? css['border-radius'] : this.opts.get('email.content.borderRadius'),
        });

        $row.append($cell);
        $container.append($row);
        $target.append($container);

        return $cell;
    },
    _buildPreheaderEmail($body) {
        let $preheader = this.dom('<span>');
        $preheader.css({
            'color': 'transparent',
            'display': 'none',
            'height': 0,
            'max-height': 0,
            'max-width': 0,
            'opacity': 0,
            'overflow': 'hidden',
            'visibility': 'hidden',
            'width': 0
        });
        $preheader.attr('style', $preheader.attr('style') + ';mso-hide:all;');
        $body.find('.email-preheader').each(function($node) {
            let text = $node.text();
            $preheader.text(text);
            $body.prepend($preheader);
            $node.remove();
        });
    },
    _buildFontLink($head) {
        let linkFont = this.opts.get('email.linkFont');
        if (linkFont) {
            let $link = this.dom('<link href="' + linkFont + '" rel="stylesheet">');
            $head.append($link);
        }
    },
    _buildContentEmail($target) {
        let html = this.app.editor.getSource();
        let utils = this.app.create('utils');

        html = utils.wrap(html, function($w) {
            $w.find('.email-options, .email-style').remove();
            $w.find('a').each(this._buildLink.bind(this));
            $w.find('.email-button').each(this._buildButton.bind(this));
            $w.find('hr').each(this._buildDivider.bind(this));
            $w.find('img').each(this._buildImage.bind(this));
            $w.find('h1, h2, h3, h4, h5, h6').each(this._buildHeading.bind(this));
            $w.find('ul, ol').each(this._buildList.bind(this));
            $w.find('li').each(this._buildListItem.bind(this));
            $w.find('pre').each(this._buildPre.bind(this));
            $w.find('blockquote').each(this._buildQuote.bind(this));
            $w.find('p').each(this._buildText.bind(this));
            $w.find('.email-wrapper, .email-footer').each(this._buildWrapper.bind(this));
            $w.find('[data-block=layout]').each(this._buildlayout.bind(this));


            let $blocks = $w.children();
            let count = $blocks.length;
            $blocks.each(function($node, i) {
                if (count !== i+1) {
                    let css = utils.cssToObject($node.attr('style'));
                    $node.css('margin-bottom', (css['margin-bottom']) ? css['margin-bottom'] : this.opts.get('email.spacing'));
                }
            }.bind(this));

        }.bind(this));

        html = utils.replaceRgbToHex(html);

        $target.html(html);
    },
    _buildHeading($node) {
        this._setHeadingStyle($node);

        let utils = this.app.create('utils');
        let css = utils.cssToObject($node.attr('style'));
        $node.css({
            'font-family': (css['font-family']) ? css['font-family'] : this.opts.get('email.font'),
            'margin-top': '0px',
            'margin-bottom': (css['margin-bottom']) ? css['margin-bottom'] : this._buildMarginBottom($node, css)
        });
        $node.attr('style', $node.attr('style') + ' mso-line-height-rule:exactly;');
        $node.removeAttr('data-rx-style-cache');
    },
    _buildText($node) {
        let utils = this.app.create('utils');
        let css = utils.cssToObject($node.attr('style'));
        let size = (css['font-size']) ? css['font-size'] : this.opts.get('email.text.fontSize');
        let lineSize = (css['line-height']) ? css['line-height'] : this.opts.get('email.text.lineHeight');
        let $wrapper = $node.closest('.email-wrapper, .email-footer');
        if ($wrapper.length !== 0) {
            let wrapperCss = utils.cssToObject($wrapper.attr('style'));
            size = (wrapperCss['font-size']) ? wrapperCss['font-size'] : size;
            lineSize = (wrapperCss['line-height']) ? wrapperCss['line-height'] : lineSize;
        }

        let line = Math.ceil(lineSize * parseInt(size)) + 'px';
        $node.css({
            'font-family': (css['font-family']) ? css['font-family'] : this.opts.get('email.font'),
            'font-size': size,
            'line-height': line,
            'margin-top': '0px'
        });
        $node.attr('style', $node.attr('style') + ' mso-line-height-rule:exactly;');
    },
    _buildLink($node) {
        if ($node.hasClass('email-button') || $node.find('img').length !== 0) return;

        let utils = this.app.create('utils');
        let css = utils.cssToObject($node.attr('style'));

        this._setLinkStyle($node);
        $node.removeAttr('data-rx-style-cache');
        $node.attr({
            'target': '_blank'
        });
        $node.css({
            'text-decoration': (css['text-decoration']) ? css['text-decoration'] : 'underline'
        });
        $node.addClass('email-link');
    },
    _buildButton($node) {

        this._setButtonStyle($node);
        $node.removeAttr('data-rx-style-cache');

        let utils = this.app.create('utils');
        let css = utils.cssToObject($node.attr('style'));
        let $parent = $node.parent();
        let parentCss = utils.cssToObject($parent.attr('style'));
        let $table = this._createTable();
        $table.css({
            'margin-bottom': (parentCss['margin-bottom']) ? parentCss['margin-bottom'] : this._buildMarginBottom($node, parentCss)
        });
        $table.addClass($node.attr('class'));

        let $tr = this.dom('<tr>');
        let $td = this.dom('<td>');
        $td.attr({
            'bgcolor': css.background,
            'align': 'center'
        });
        $td.css({
            'border-radius': (css['border-radius']) ? css['border-radius'] : 0,
            'font-size': css['font-size']
        });
        $td.attr('style', $td.attr('style') + ' mso-padding-alt: ' + css.padding);

        $node.attr({
            'target': '_blank'
        });
        $node.css({
            'display': 'inline-block',
            'padding-left': '0',
            'padding-right': '0'
        });
        $node.attr('style', $node.attr('style') + ' mso-line-height-rule:exactly;');

        let $clone = $node.clone();

        $td.append($clone);
        $tr.append($td);
        $table.append($tr);

        $parent.before($table);
        $parent.remove();
    },
    _buildDivider($node) {
        this._setDividerStyle($node);
        $node.removeAttr('data-rx-style-cache');

        let utils = this.app.create('utils');
        let css = utils.cssToObject($node.attr('style'));
        let $table = this._createTable();
        $table.css({
            'margin-bottom': (css['margin-bottom']) ? css['margin-bottom'] : this._buildMarginBottom($node, css)
        });
        $table.addClass($node.attr('class'));

        let $tr = this.dom('<tr>');
        let $td = this.dom('<td>');
        $td.css({
            'font-size': '1px',
            'margin': 0,
            'background': (css.background) ? css.background : false,
            'height': (css.height) ? css.height : false,
            'line-height': (css.height) ? css.height : false
        });
        $td.html('&nbsp;');

        $tr.append($td);
        $table.append($tr);

        $node.after($table);
        $node.remove();
    },
    _buildImage($node) {
        let utils = this.app.create('utils');
        let $parent = $node.parent();
        let $wrapper = $parent;
        let $link = false;
        if ($parent.get().tagName === 'A') {
            $link = $parent;
            $link.css({
                'text-decoration': 'none',
                'cursor': 'pointer',
                'line-height': '100%',
                'font-size': '0px',
                'display': 'block'
            });
            $wrapper = $parent.parent();
        }

        let wrapperCss = utils.cssToObject($wrapper.attr('style'));
        let align = (wrapperCss['text-align']) ? wrapperCss['text-align'] : 'center';
        let margin = (align === 'center') ? '0 auto' : '0';

        // table
        let $table = this._createTable();
        $table.css({
            'margin-bottom': (wrapperCss['margin-bottom']) ? wrapperCss['margin-bottom'] : this._buildMarginBottom($wrapper, wrapperCss)
        });
        $table.addClass($wrapper.attr('class'));

        let $tr = this.dom('<tr>');
        let $td = this.dom('<td>');
        $td.attr('align', align);
        $td.css({
            'background': (wrapperCss.background) ? wrapperCss.background : false,
            'border-radius': (wrapperCss['border-radius']) ? wrapperCss['border-radius'] : false,
            'padding': (wrapperCss.padding) ? wrapperCss.padding : false
        });

        $node.css({
            'display': 'block',
            'max-width': '100%',
            'height': 'auto',
            'margin': margin,
            'border-radius': (wrapperCss['border-radius']) ? wrapperCss['border-radius'] : false,
            'border': (wrapperCss.border) ? wrapperCss.border : 'none'
        });

        let $clone = ($link) ? $link.clone() : $node.clone();

        $td.append($clone);
        $tr.append($td);
        $table.append($tr);

        $wrapper.after($table);
        $wrapper.remove();

    },
    _buildList($node) {
        let utils = this.app.create('utils');
        let tag = $node.get().tagName.toLowerCase();
        let paddingLeft = (tag === 'ul') ? '20px' : '24px';
        let css = utils.cssToObject($node.attr('style'));

        if (css.padding) {
            $node.css('padding', css.padding);
        }

        let paddingLeftOrig = parseInt($node.css('padding-left'));
        if (!paddingLeftOrig || paddingLeftOrig === '' || paddingLeftOrig === 0) {
            $node.css('padding-left', paddingLeft);
        }

        $node.css({
            'margin-top': '0px'
        });
    },
    _buildListItem($node) {
        let utils = this.app.create('utils');
        let css = utils.cssToObject($node.attr('style'));
        let size = (css['font-size']) ? css['font-size'] : this.opts.get('email.text.fontSize');
        let lineSize = (css['line-height']) ? css['line-height'] : this.opts.get('email.text.lineHeight');
        let $wrapper = $node.closest('.email-wrapper, .email-footer');
        if ($wrapper.length !== 0) {
            let wrapperCss = utils.cssToObject($wrapper.attr('style'));
            size = (wrapperCss['font-size']) ? wrapperCss['font-size'] : size;
            lineSize = (wrapperCss['line-height']) ? wrapperCss['line-height'] : lineSize;
        }

        let line = Math.ceil(lineSize * parseInt(size)) + 'px';
        $node.css({
            'text-align': 'left',
            'font-family': (css['font-family']) ? css['font-family'] : this.opts.get('email.font'),
            'font-size': size,
            'line-height': line
        });
        $node.attr('style', $node.attr('style') + ' mso-line-height-rule:exactly;');
    },
    _buildPre($node) {
        $node.find('code').unwrap();

        let utils = this.app.create('utils');
        let css = utils.cssToObject($node.attr('style'));
        let text = $node.text().trim();
        let $code = this.dom('<code>');
        $code.html(text);

        $node.html('');
        $node.append($code);

        $code.css({
            'font-family': this.opts.get('email.pre.fontFamily')
        });
        $node.css({
            'font-size': (css['font-size']) ? css['font-size'] : this.opts.get('email.pre.fontSize'),
            'line-height': (css['line-height']) ? css['line-height'] :  this.opts.get('email.pre.lineHeight'),
            'border-radius':  (css['border-radius']) ? css['border-radius'] : this.opts.get('email.pre.borderRaidus'),
            'border': (css.border) ? css.border : this.opts.get('email.pre.border'),
            'padding': (css.padding) ? css.padding : this.opts.get('email.pre.padding'),
            'color': (css.color) ? css.color : this.opts.get('email.pre.color'),
            'background': (css.background) ? css.background : this.opts.get('email.pre.background'),
            'overflow': 'auto'
        });

    },
    _buildQuote($node) {
        let utils = this.app.create('utils');
        let css = utils.cssToObject($node.attr('style'));

        $node.css({
            'margin-left': '0',
            'border-left': (css['border-left']) ? css['border-left'] : this.opts.get('email.quote.borderLeft'),
            'padding': (css.padding) ? css.padding : this.opts.get('email.quote.padding'),
            'background': (css.background) ? css.background : this.opts.get('email.quote.pre.background'),
            'color': (css.color) ? css.color : this.opts.get('email.quote.pre.color'),
            'font-weight': (css['font-weight']) ? css['font-weight'] : this.opts.get('email.quote.pre.fontWeight'),
            'font-style': (css['font-style']) ? css['font-style'] : this.opts.get('email.quote.pre.fontStyle'),
            'overflow': 'auto'
        });
    },
    _buildlayout($node) {
        let utils = this.app.create('utils');
        let layoutCss = utils.cssToObject($node.attr('style'));
        let $table = this._createTable();
        $table.addClass('email-column-container');
        $table.addClass($node.attr('class'));

        $table.css({
            'margin-bottom': (layoutCss['margin-bottom']) ? layoutCss['margin-bottom'] : this._buildMarginBottom($node, layoutCss),
            'background': (layoutCss.background) ? layoutCss.background : '',
            'padding': (layoutCss.padding) ? layoutCss.padding : '',
            'border': (layoutCss.border) ? layoutCss.border : '',
            'border-radius': (layoutCss['border-radius']) ? layoutCss['border-radius'] : ''
        });
        let $tr = this.dom('<tr>');

        // columns
        let $columns = $node.find('[data-block=column]');
        let size = $columns.length - 1;
        $columns.each(function($column, i) {
            let css = utils.cssToObject($column.attr('style'));
            let $td = this.dom('<td>');
            let width = (css['flex-basis']) ? (css['flex-basis']) : (css.width);
            $td.addClass('email-column');
            $td.addClass($column.attr('class'));

            let $spacer = this.dom('<td>');
            $spacer.html('&nbsp;');
            $spacer.addClass('email-column-spacer');
            $spacer.width(this.opts.get('email.gutter'));
            if ($td.hasClass('mobile-hidden')) {
                $spacer.addClass('mobile-hidden');
            }

            $td.attr({
                'bgcolor': (css.background) ? css.background : ''
            });
            $td.css({
                'background': (css.background) ? css.background : '',
                'padding': (css.padding) ? css.padding : '',
                'border': (css.border) ? css.border : '',
                'border-radius': (css['border-radius']) ? css['border-radius'] : '',
                'width': width
            });

            $td.html($column.html());
            $tr.append($td);

            if (size !== i) {
                $tr.append($spacer);
            }
        }.bind(this));


        $table.append($tr);

        $node.after($table);
        $node.remove();
    },
    _buildWrapper($node) {
        let utils = this.app.create('utils');
        let css = utils.cssToObject($node.attr('style'));
        let $table = this._createTable();
        $table.addClass($node.attr('class'));
        $table.css({
            'margin-bottom': (css['margin-bottom']) ? css['margin-bottom'] : this._buildMarginBottom($node, css)
        });
        let $tr = this.dom('<tr>');
        let $td = this.dom('<td>');
        $td.attr('style', $node.attr('style'));
        $td.css({
            'background': (css.background) ? css.background : '',
            'padding': (css.padding) ? css.padding : '',
            'border': (css.border) ? css.border : '',
            'border-radius': (css['border-radius']) ? css['border-radius'] : ''
        });
        $td.attr({
            'bgcolor': (css.background) ? css.background : ''
        });
        $td.html($node.html());

        $tr.append($td);

        $table.append($tr);

        $node.after($table);
        $node.remove();

    },

    // utils
    _createTable() {
        let $table = this.dom('<table>');
        $table.addClass('email-table');
        $table.attr({
            'width': '100%',
            'cellpadding': '0',
            'cellspacing': '0',
            'border': '0',
            'role': 'presentation'
        });
        $table.css({
            'margin-top': '0px'
        });

        return $table;
    },
    _setFrameHeight($iframe) {
        let $body = this.dom($iframe.get().contentWindow.document).find('body');
        let height = $body.height();
        $iframe.height(height);
    },
    _setStyle($node, obj) {
        let utils = this.app.create('utils');
        let origObj = utils.cssToObject($node.attr('style'));
        let finalObj = {};

        for (let [key, value] of Object.entries(obj)) {
            let origVal = origObj[key];
            if (!origVal) {
                finalObj[key] = value;
            }
        }

        $node.css(finalObj);
    },
    _cacheStyle($el) {
        let name = 'data-rx-style-cache',
            style = $el.attr('style');

        if (style) {
            style = style.replace(/"/g, '');
            $el.attr(name, style);
        }
        else if (!style || style === '') {
            $el.removeAttr(name);
        }
    },
    _beforeFormat(event) {
        const instances = event.get('instances');

        for (let instance of Object.values(instances)) {
            let $block = instance.getBlock();
            let $elms = $block.find('p, li');
            this._clearCssProps($block);
            this._clearCssProps($elms);
        }
    },
    _clearCssProps($el) {
        $el.css({
            'font-size': '',
            'font-weight': '',
            'line-height': '',
            'letter-spacing': '',
            'text-transform': ''
        });

        $el.each(this._cacheStyle.bind(this));
    }
});