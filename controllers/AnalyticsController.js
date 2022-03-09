const { locations } = require('../locationdata');
const { Location, User } = require('../models');

module.exports = {
  async getHighScores(req, res, next) {
    let number = req.params.number || 5;
    let score = [];
    const users = await User.find({}).lean();
    users.forEach((user) => {
      score.push({
        score: user.locationsVisited.length,
        id: user._id,
        name: user.name,
      });
    });
    //sort scores by highscore
    score.sort((a, b) => {
      return b.score - a.score;
    });
    res.send(score.slice(0, number));
  },
  async userStats(req, res, next) {
    if (req.params.id == 0) {
      req.params.id = req.user.id;
    }

    const user = await User.findById(req.params.id)
      .populate('locationsVisited')
      .lean();
    const { locationsVisited } = user;
    //total number of visits out of all possible visits
    const totalVisits = user.locationsVisited.length;
    const totalLocations = locations.length;
    //find number of visits per month

    // build array of locations visited
    let userVisit = [];
    locationsVisited.map((location) => {
      location.visitedBy.map((visit) => {
        if (visit.userId.toString() === req.params.id) {
          userVisit.push({
            ...visit,
            title: location.title,
            locationId: location._id,
          });
        }
      });
    });
    //sort array by date
    userVisit.sort((a, b) => {
      return new Date(b.date) - new Date(a.date);
    });

    //get current month
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();
    //get user visits by month
    const monthsList = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ];
    const { months } = req.params;

    let monthsOfInterest = [];
    for (let i = currentMonth; i > currentMonth - months; i--) {
      if (i < 0) {
        monthsOfInterest.unshift(i + 12);
      } else {
        monthsOfInterest.unshift(i);
      }
    }
    //build array of data by month
    let byMonthData = [];
    for (let i = 0; i < months; i++) {
      byMonthData.push(0);
    }
    //map over all visits and see if visit was in month of interest
    userVisit.map((visit) => {
      //new date
      let date = new Date(visit.date);
      let month = date.getMonth();
      let year = date.getFullYear();
      //stupid check to not include future visits
      if (currentYear - year >= 0) {
        const index = monthsOfInterest.findIndex((element) => {
          return element === month;
        });
        if (index != -1) {
          byMonthData[index] = byMonthData[index] + 1;
        } else {
        }
      }
    });
    //find cumulative visits as off month of interest
    //build data array
    let cumulativeData = [];
    for (let i = 0; i < months; i++) {
      cumulativeData.push(0);
    }
    // userVisit has all visits organized by date starting with most recent
    userVisit.map((visit) => {
      let date = new Date(visit.date);
      let month = date.getMonth();
      let year = date.getFullYear();
      //test that visit has year that is not in future
      if (year - currentYear > 0) {
        return;
      }
      //for each visit we pull the month and if it is a month of interest add it
      const index = monthsOfInterest.findIndex((element) => {
        return element === month;
      });
      if (index != -1) {
        for (let i = index; i < cumulativeData.length; i++) {
          cumulativeData[i] = cumulativeData[i] + 1;
        }
      } else {
        for (let i = 0; i < cumulativeData.length; i++) {
          cumulativeData[i] = cumulativeData[i] + 1;
        }
      }
    });

    // get user rank and return it
    let userRank;

    let allUsers = await User.find({}).lean();
    const ranking = allUsers.map((user) => {
      return { name: user.name, visits: user.locationsVisited.length };
    });

    ranking.sort((a, b) => {
      return b.visits - a.visits;
    });
    let userRanking = 'n/a';
    let rankings = ['1st', '2nd', '3rd'];
    for (let i = 0; i < ranking.length; i++) {
      console.log(ranking[i]);
      if (ranking[i].name === req.user.name) {
        if (i < 3) {
          userRanking = `${rankings[i]}`;
        } else {
          userRanking = `${i + 1}th`;
        }
        break;
      }
    }
    console.log(userRanking);

    //convert monthsOfInterest to actual months
    for (let i = 0; i < monthsOfInterest.length; i++) {
      monthsOfInterest[i] = monthsList[monthsOfInterest[i]];
    }

    //get total number of locations
    let numLocations = locations.length;

    let userStats = {
      numLocations,
      recentVisits: userVisit,
      monthlyData: {
        months: monthsOfInterest,
        data: byMonthData,
      },
      cumulativeData: {
        months: monthsOfInterest,
        data: cumulativeData,
      },
      userRanking
    };

    res.send(userStats);
  },
  async recentVisits(req, res, next) {
    //return a specified number of recent visits
    const results = await Location.find().sort({ updatedAt: -1 }).exec();

    // built returned results array
    let returnData = [];

    results.map((location) => {
      let visit = {};
      if (location.visitedBy[0]) {
        visit.name = location.visitedBy[0].name;
        visit.date = location.visitedBy[0].date;
        visit.title = location.title;
        returnData.push(visit);
      }
    });

    res.send(returnData);
  },
};
