import Taro, { Component } from '@tarojs/taro'
import { View, Text, Image, Swiper, SwiperItem  } from '@tarojs/components'
import './index.scss'
import Fly from 'flyio/dist/npm/wx'
import x2js from 'xml-js'

export default class Index extends Component {

  config = {
    navigationBarTitleText: '首页'
  }

  constructor() {
    super(...arguments)
    this.state = {
      current: 1,
      duration: 500,
      interval: 5000,
      isAutoplay: true,
      isCircular: true,
      hasIndicatorDots: true,
      bannerList: []
    }
  }

  componentDidMount () {
    this.getBanner()
  }

  getBanner() {
    let fly = new Fly
    let url = 'https://api.ithome.com/xml/slide/slide.xml'
    fly.get(url).then((res) => {
      let resNormal = JSON.parse(x2js.xml2json(res.data, {compact: true, spaces: 2}));
      this.setState({
        bannerList : resNormal.rss.channel.item
      });
    })
  }

  render () {
    const { current, duration, interval, circular,isAutoplay,hasIndicatorDots,bannerList } = this.state
    return (
      <View className="container">
        <Swiper
          slideMult='10'
          indicatorColor='#999'
          indicatorActiveColor='#333'
          current={current}
          duration={duration}
          interval={interval}
          circular={isCircular}
          autoplay={isAutoplay}
          indicatorDots={hasIndicatorDots}
          preMargin='20'
          className="swipers">
            {
              bannerList.map((item, index) => {
                //console.log(index);
                return (
                  <SwiperItem>
                    <Image src="{{item.image._text}}" key="{{index}}" mode="widthFix" style="width: 100%" />
                  </SwiperItem>
                )
              })
            }
        </Swiper>
      </View>
    )
  }
}
