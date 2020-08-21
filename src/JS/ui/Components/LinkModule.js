const React = require('react');
const { remote } = window.require('electron')
const { spawn } = window.require('child_process')

import './LinkModule.css';

import $ from 'jquery';

class LinkInput extends React.Component {
    constructor(props) {
        super (props);
        this.state= {
            UrlInput: '',
            Output: 'M4A',
            outputDir: remote.app.getPath('desktop')+"\\Youtube Converter Output",
            NameFormatting: "%(title)s.%(ext)s",
            isPlaylist: false, 
            optionsOpen: false,
            StartAt: 0,
            EndAt: 0
        }

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        var name = event.target.name;  
        if (this.state.EndAt <= this.state.StartAt) {
            this.setState({EndAt: parseInt(this.state.StartAt) + 1})
        }
        this.setState({[name]: event.target.value});
        
    }

    handleSubmit(event) {
        event.preventDefault();
        if (this.state.UrlInput.includes("list")) {
            this.setState({isPlaylist: true});
        } 
        else {
            this.setState({isPlaylist: false});
        }
        var download = spawn('yt-downloader ' + this.state.UrlInput + ' ' + this.state.isPlaylist + ' ' + this.state.Output + ' ' + this.state.NameFormatting + ' ' + this.state.StartAt + ' ' + this.state.EndAt);
        download.stdout.on('data', function(data) {
            this.setState({CmdOutput: this.state.CmdOutput+data.toString()})
        })
    }

    componentDidMount() {
        $("#optionsDiv").slideUp(0);
        $("#optionsButton").click(() => {
            if (this.state.optionsOpen) {
                this.setState({optionsOpen: false});
                $("#optionsDiv").slideUp();
            } else {
                this.setState({optionsOpen: true});
                $("#optionsDiv").slideDown()
            }
        });
    }

    render() {
        return (
            <div className="LinkModuleDiv">
                <form onSubmit={this.handleSubmit}>
                    <label className="font-weight-light Text">
                        Link<span title="URL to youtube video, must start with https://"><img className="Help" src="./images/help.png"/></span><br/>
                        <input onChange={this.handleChange} value={this.state.UrlInput} className="LinkModuleUrl TextSmall" placeholder="Link to video or playlist" name="UrlInput" type="url" pattern="https://.*" size="50" required/>
                    </label>
                    <br/>
                    <label className="font-weight-light Text">
                        Output format<br/>
                        <select onChange={this.handleChange} value={this.state.selectedOutput} className="font-weight-light TextSmall" name="Output">
                            <optgroup label="Audio">
                                <option value="M4A">M4A</option>
                                <option value="FLAC">FLAC</option>
                                <option value="ALAC">ALAC</option>
                                <option value="MP3">MP3</option>
                                <option value="WAV">WAV</option>
                                <option value="WMA">WMA</option>
                                <option value="AAC">AAC</option>
                                <option value="OGG">OGG</option>
                            </optgroup>
                            <optgroup label="Video">
                                <option value="AVCHD">AVCHD</option>
                                <option value="AVI">AVI</option>
                                <option value="FLV">FLV</option>
                                <option value="MKV">MKV</option>
                                <option value="MOV">MOV</option>
                                <option value="MP4">MP4</option>
                                <option value="WEBM">WEBM</option>
                                <option value="WMV">WMV</option>
                            </optgroup>
                        </select>
                    </label>
                    <br/>
                    {/*<label className="font-weight-light Text">
                        Playlist <input className="Checkbox" type="checkbox" name="isPlaylist" checked={this.state.isPlaylist} onChange={this.handleChange}/>
                    </label>
                    <br/>*/}
                    <button type="button" id="optionsButton" className="Options btn btn-light font-weight-light Text">Options</button>
                    <br/>
                    <div id="optionsDiv">
                        <label className="font-weight-light TextSmall IndentRight">
                            Output Directory<span title={`Defaults to the folder "Youtube Converter Out" on the user's desktop`}><img className="Help" src="./images/help.png"/></span><br/>
                            <input value={this.state.outputDir} onChange={this.handleChange} type="text" name="outputDir" className="LinkModuleOptions"/>
                        </label>
                        <br/>
                        <label className="font-weight-light TextSmall IndentRight">
                            Name formatting<span title={`Defaults to "%(title)s.%(ext)s"`}><img className="Help" src="./images/help.png"/></span><br/>
                            <input value={this.state.NameFormatting} onChange={this.handleChange} type="text" name="NameFormatting" className="LinkModuleOptions"/>
                        </label>
                        <br/>
                        <label className="font-weight-light TextSmall IndentRight">
                            Start At <span title="Download from the playlist starting at the specified index. When it is 0, it will download the entire playlist"><img className="Help" src="./images/help.png"/></span><br/>
                            <input name="StartAt" min="0" value={this.state.StartAt} onChange={this.handleChange} type="number" className="LinkModuleOptions TextSmall font-weight-light"/>
                        </label>
                        <br/>
                        <label className="font-weight-light TextSmall IndentRight">
                            End At<span title="Download from the playlist ending at the specified index. If start is 0, this will be disregarded. End MUST be greater in value than Start."><img className="Help" src="./images/help.png"/></span><br/>
                            <input name="EndAt" min={parseInt(this.state.StartAt)+1} value={this.state.EndAt} onChange={this.handleChange} type="number" className="LinkModuleOptions TextSmall font-weight-light"/>
                        </label> 
                    </div>
                    <br/>
                    <input type="submit" value="Convert" className="btn btn-success"/>
                    {this.state.error ? <p className="Text bg-danger"></p> : null}
                </form>
                <code value={this.state.CmdOutput}>
                
                </code>
            </div>
        )
    }
}

export default LinkInput