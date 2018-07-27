import React from 'react';
import { Platform, StatusBar, View } from 'react-native';
import { createBottomTabNavigator, createStackNavigator } from 'react-navigation';
import { Constants } from 'expo';
import { green, white } from './utils/colors';
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import store from './store/store';
import DeckOverview from './components/DeckOverview';
import NewDeck from './components/NewDeck';
import DeckDetail from './components/DeckDetail';
import NewDeckCart from './components/NewDeckCart';
import DeckQuiz from './components/DeckQuiz';

function FlashCardsStatusBar ({backgroundColor, ...props}) {
  return (
    <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  )
}

const MainNavigator = createStackNavigator({
  Home: {
    screen: DeckOverview,
    navigationOptions: {
      header: null
    }
  },
  DeckDetail: {
    screen: DeckDetail,
    navigationOptions: {
      headerTintColor: white,
      headerStyle: {
        backgroundColor: green,
      }
    }
  },
  NewDeckCart: {
    screen: NewDeckCart,
    navigationOptions: {
      headerTitle: 'Add Cart',
      headerTintColor: white,
      headerStyle: {
        backgroundColor: green,
      }
    }
  },
  DeckQuiz: {
    screen: DeckQuiz,
    navigationOptions: {
      headerTitle: 'Quiz',
      headerTintColor: white,
      headerStyle: {
        backgroundColor: green,
      }
    }
  },
});

const TabNavigation = createBottomTabNavigator({
  DeckOverview: {
    screen: MainNavigator,
    navigationOptions: {
      tabBarLabel: 'Deck Overview',
      tabBarIcon: ({ tintColor }) => <Ionicons name='ios-bookmarks' size={30} color={tintColor} />
    },
  },
  NewDeck: {
    screen: NewDeck,
    navigationOptions: {
      tabBarLabel: 'Add Deck',
      tabBarIcon: ({ tintColor }) => <FontAwesome name='plus-square' size={30} color={tintColor} />
    },
  },
}, {
  navigationOptions: {
  },
  tabBarOptions: {
    activeTintColor: Platform.OS === 'ios' ? green : white,
    style: {
      height: 56,
      backgroundColor: Platform.OS === 'ios' ? white : green,
      shadowColor: 'rgba(0, 0, 0, 0.24)',
      shadowOffset: {
        width: 0,
        height: 3
      },
      shadowRadius: 6,
      shadowOpacity: 1
    }
  }
});

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <View style={{flex: 1}}>
          <FlashCardsStatusBar backgroundColor={green} barStyle="light-content" />
          <TabNavigation />
        </View>
      </Provider>
    );
  }
};
