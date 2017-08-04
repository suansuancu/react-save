const scaleName = {
  's': 'sheshi',
  'h': 'huashi'
};

function toSheshi(huashi) {
  return (huashi - 32) * 5 / 9;
}


function toHuashi(sheshi) {
  return (sheshi * 9 / 5) + 32;
}

function tryConvert(temperature, convert) {
  const input = parseFloat(temperature);
  if (Number.isNaN(input)) {
	return ''
  }
  const output = convert(temperature);
  const rounded = Math.round(output * 1000) / 1000;
  return rounded.toString();
}
function IfBoiling(props) {
  	if(props.dushu >= 100){
  	    return <h3>The water is boiled</h3>
	}else {
  		return <h3>The water is not boil yet</h3>
  	}
}
class Temperature extends React.Component {
  constructor(props) {
	super(props);

	this.handleChange = this.handleChange.bind(this);
  }
  handleChange(e) {

		this.props.onTemperatureChange(e.target.value);
  }

  render() {
	const temperature = this.props.temperature;
	const scale = this.props.scale;

	return <fieldset>
	  <legend>Please input temperature in {scaleName[scale]}:</legend>
	  <input value={temperature} onChange={this.handleChange} />
	</fieldset>
  }
}
class Calculation extends React.Component {
  	constructor(props){
  	  	super(props);
	    this.handleSheshiChange = this.handleSheshiChange.bind(this);
  	  	this.handleHuashiChange = this.handleHuashiChange.bind(this);
  	  	this.state = {
  	  	  	temperature:'',
		  	scale: 's'
		}
	}

	handleSheshiChange(temperature) {
		this.setState({scale:'s', temperature})

	}

	handleHuashiChange(temperature) {
	  this.setState({scale:'h', temperature})
	}

	render() {
  	  	const scale = this.props.scale;
  	  	const temperature = this.props.temperature;
  	  	const sheshi= scale == 'h' ? tryConvert(temperature, toSheshi) : temperature;
  	  	const huashi= scale == 's' ? tryConvert(temperature, toHuashi) : temperature;

  	  	return <div>
		  	<Temperature scale="h" temperature={huashi} onTemperatureChange={this.handleHuashiChange} />
		  	<Temperature scale="s" temperature={sheshi} onTemperatureChange={this.handleSheshiChange} />
		    <IfBoiling dushu={parseFloat(sheshi)}/>
		</div>
	}
}
ReactDOM.render(<Calculation/>, document.getElementById('app'));