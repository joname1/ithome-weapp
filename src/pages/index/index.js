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
      bannerList: [],
      newslist: []
    }
    this.toDetails = this.toDetails.bind(this)
  }

  componentDidMount () {
    this.getBanner()
    this.getNewList()
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

  getNewList() {
    let fly = new Fly()
    let url = 'https://api.ithome.com/json/newslist/news?r=0'
    fly.get(url).then((res) => {
      this.setState({
        newslist: res.data.newslist
      })
    })
  }

  toDetails() {
    console.log(1);
  }
  render () {
    const { current, duration, interval, circular,isAutoplay,hasIndicatorDots,bannerList, newslist } = this.state
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
        {
          newslist.map((item, index) => {
            return (
              <div class="weui-media-box weui-media-box_text">
              <div class="weui-media-box_appmsg" onClick={this.toDetails}>
                  <div class="weui-media-box__hd">
                    <Image src={item.image} class="weui-media-box__thumb" />
                  </div>
                  <div class="weui-media-box__bd">
                      <div class="weui-media-box__title">{item.title}</div>
                      <p class="weui-media-box__desc">{item.description}</p>
                  </div>
              </div>
          </div>
            )
          })
        }
      </View>
    )
  }
}
