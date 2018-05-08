import React, { Component, Fragment } from 'react';
import styles from './home.css';
import { fetchData } from '../../reduxModules/fetchThunk';
import { connect } from 'react-redux';


class Home extends Component {
    render (){
      return (
        <Fragment>
          <div>Hello home!</div>

<p>
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla sed scelerisque enim. Nulla porttitor imperdiet lorem ac tincidunt. Etiam felis dui, dapibus nec luctus ut, consectetur vitae felis. Donec elit enim, pellentesque a mi ut, rutrum aliquam ante. Etiam vel sem est. Phasellus quis tempus ante. Nunc nec dui sed purus rhoncus laoreet sit amet eget nibh. Ut orci metus, pharetra quis tellus ut, suscipit ultricies nunc. Morbi ut velit condimentum, dictum tellus ut, maximus lacus. Vestibulum sit amet mauris enim. Interdum et malesuada fames ac ante ipsum primis in faucibus. Suspendisse quis augue quis neque finibus fermentum non ut ipsum. Maecenas dapibus massa a neque commodo lobortis. Aenean vestibulum maximus accumsan.
</p>
<p>
Suspendisse potenti. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent at mauris quam. Donec hendrerit arcu in ex suscipit, lacinia laoreet dui dictum. Quisque non felis mollis, congue turpis eu, vulputate neque. Aliquam fermentum, ipsum quis condimentum blandit, magna arcu consequat elit, eget pretium orci neque vel lacus. Nulla facilisi. Cras maximus dui vitae hendrerit luctus. Nam eu massa at mi mollis pretium ut vel lacus. Proin nec nunc mi. Cras interdum lobortis ultrices. Duis consectetur turpis metus, et feugiat lacus dictum eu. Vestibulum cursus sed nunc gravida fermentum. Aliquam at scelerisque mi, a bibendum mauris. Sed a quam tellus. Maecenas pretium purus quis dolor pellentesque dictum.
</p>
<p>
Nulla a lectus augue. Sed sit amet nulla eget sem molestie dapibus id et ex. Sed vitae erat non leo sagittis semper non sit amet tellus. In hac habitasse platea dictumst. Maecenas sem felis, sodales quis leo id, placerat blandit odio. Duis pretium pellentesque dolor, eget sagittis dui. Sed ultrices lacus quis dignissim consectetur. Morbi et condimentum sapien, at dignissim augue. Nam massa quam, porta quis lacus at, commodo faucibus velit. In facilisis ex arcu, et finibus est mattis non. Nulla non varius justo. Duis at turpis elit.
</p>
<p>
Pellentesque consequat, augue quis vehicula vehicula, mi lacus dapibus nisl, et consequat risus felis vitae justo. Etiam ullamcorper dolor non metus vestibulum, ut vehicula nisi elementum. In a justo et ligula dapibus condimentum vel at tortor. Curabitur porta augue sed maximus faucibus. In hac habitasse platea dictumst. Phasellus eleifend, felis dictum lobortis dapibus, nisl turpis interdum nisi, lacinia tristique orci leo et tellus. Suspendisse faucibus orci arcu, vel egestas nulla sollicitudin vel. Morbi urna mauris, pulvinar vitae lacus eget, fringilla pulvinar sapien. Quisque quis tortor et sem posuere viverra. Aliquam sit amet neque ut urna efficitur faucibus vel non dui. Fusce at libero leo. In venenatis tristique ligula, non pulvinar eros aliquet vel. Donec nec viverra metus. Duis interdum a ligula non consequat.
</p>
<p>
Mauris eget neque non erat pretium congue eget in justo. Integer auctor nisl urna, a egestas nulla posuere vel. Nunc malesuada et libero vel luctus. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Morbi dui enim, dictum vel facilisis quis, convallis non leo. Pellentesque et condimentum nisi. Nulla molestie ornare nibh, sit amet laoreet ipsum fermentum quis. Nullam metus ipsum, tincidunt non blandit non, fermentum et lorem. Donec consectetur nunc mattis, lacinia sem ac, aliquam neque. Morbi fringilla lobortis dignissim. Pellentesque a venenatis ex. Nulla facilisi. Aenean risus erat, tincidunt sit amet consequat at, consequat eu erat. Vivamus a sapien ornare, posuere felis quis, fermentum nulla. Quisque dapibus in justo laoreet vulputate. Nunc velit mauris, vestibulum a varius sit amet, ultrices nec nisl.
</p>
        </Fragment>
      )
    }
}

const mapStateToProps = (state) => {
  return {
    auth: state.authReducer,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchData: (url, cb) => dispatch(fetchData(url,cb)),
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Home);
