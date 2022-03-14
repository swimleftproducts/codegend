const { locations } = require('../locationdata');
const { Location, User } = require('../models');

module.exports = {
  async markers(req, res, next) {
    //get all locations
    Location.find({})
      .lean()
      .then((data) => {
        res.send(data);
      });
  },
  async addLocation(req, res, next) {
    let user = await User.findById(req.user._id).exec();
    //check if visited before

    let visited = false;
    user.locationsVisited.map((location) => {
      if (location.toString() === req.body.id) {
        visited = true;
      }
    });
    if (visited) {
      res.send({ saved: false, message: 'already visited' });
      return;
    }
    //add user to the visited site
    let location = await Location.findById(req.body.id);
    //original code

    await location.visitedBy.unshift({
      date: new Date(),
      userId: req.user.id,
      name: req.user.name,
    });

    await user.locationsVisited.push(req.body.id);
    const results = await user.save();

    const returnLocation = await location.save();

    //original code
    Location.findById(req.body.id)
      .lean()
      .then((data) => {
        res.send(data);
      });
  },
  async addPastLocation(req, res, next) {
    let user = await User.findById(req.user._id).exec();
    //check if visited before
    let visited = false;

    user.locationsVisited.map((location) => {
      if (location.toString() === req.body.id) {
        visited = true;
      }
    });
    let location = await Location.findById(req.body.id);

    if (visited) {
      //no need to modify the user record to add visit
      // but we want to update the user record in the location visitedBy array
      const revisedVisitedBy = location.visitedBy.map((visitor) => {
        if (visitor.userId.toString() === req.user.id) {
          const newData = {
            date: new Date(req.body.date),
            userId: req.user.id,
            name: req.user.name,
          };
          return newData;
        } else {
          return visitor;
        }
      });

      location.visitedBy = revisedVisitedBy;

      await location.save();

      Location.findById(req.body.id)
        .lean()
        .then((data) => {
         
          res.send(data);
        });
    } else {
      await location.visitedBy.unshift({
        date: new Date(req.body.date),
        userId: req.user.id,
        name: req.user.name,
      });

      await user.locationsVisited.push(req.body.id);
      const results = await user.save();

      const returnLocation = await location.save();

      Location.findById(req.body.id)
        .lean()
        .then((data) => {
         
          res.send(data);
        });
    }
  },
  async unvisitPastLocation(req, res, next) {
    let user = await User.findById(req.user._id).exec();
    //location to return
    let location;
    //remove the user visit from the location document
   await Location.findByIdAndUpdate(
      { _id: req.body.id },
      { $pull: { visitedBy: { userId: req.user.id } }},
      {new:true}
    ).then((updatedLocation) => {
      location = updatedLocation
      //console.log('removed from location',location);
    });

    // remove location from user history
    
   await  User.findByIdAndUpdate(
      { _id: req.user.id },
      { $pull: { locationsVisited: req.body.id } }
    ).then(() => {
    //  console.log('removed from user: ', req.body.id);
    });


    //get data to send back

    res.send(location);
  },
};
