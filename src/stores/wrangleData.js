const wrangleData = (tree, events) => {
  let tags = {
    ebene0: {},
    initiatives: {},
    ebene1: {},
    classes: {},
    seminars: {},
  };

  let pathlist = {};

  let eventlist = {};

  let rooms = {};

  let queue = [{ node: tree, id: tree.id, path: [tree] }];

  let lastRoomid = 1;

  while (queue.length > 0) {
    let curr = queue.shift();
    if (curr.node.type == "item") {
      let currpaths = curr.path.filter(
        x =>
          ![
            "structure-root",
            "Universität",
            "location-university",
            "rundgang22-root",
          ].includes(x.template) && x.id !== curr.id,
      );
      if (curr.id in pathlist) {
        let newpaths = pathlist[curr.id].concat(currpaths);
        pathlist[curr.id] = [
          ...new Map(newpaths.map(item => [item.id, item])).values(),
        ];
      } else {
        pathlist[curr.id] = currpaths;
      }
      if (
        curr.node.template == "event" &&
        (!(curr.id in eventlist) || eventlist[curr.id]?.room.id == "unbekannt")
      ) {
        let eventData = events.find(e => e.id == curr.id);
        if (
          eventData &&
          eventData?.allocation?.temporal?.filter(t => t.start < 1658563200)
            ?.length < 1
        ) {
          let building = curr.path.find(
            loc =>
              loc.template == "location-building" ||
              loc.template == "location-external",
          );
          let room = curr.path.find(loc => loc.template == "location-room");
          if (building?.template == "location-external") {
            let [roomname] = building.name?.split(" ") ?? [building.name];
            room = {
              id: `room-${building.id}`,
              name: roomname,
            };
          }
          if (!building) {
            building = { id: "unbekannt", name: "unbekannt" };
            room = { id: "unbekannt", name: lastRoomid };
            lastRoomid += 1;
          }
          let eventobject = {
            ...curr.node,
            building: building,
            room: room,
            allocation: eventData?.allocation,
          };
          eventlist[curr.id] = eventobject;
        }
      }
      currpaths.map((context, i) => {
        let ebene = null;
        if (
          context.template == "faculty" ||
          context.template == "consulting service" ||
          context.template == "centre"
        ) {
          ebene = "ebene0";
        } else if (context.template == "initiative") {
          ebene = "initiatives";
        } else if (
          context.template == "institute" ||
          context.template == "subject"
        ) {
          ebene = "ebene1";
        } else if (
          context.template == "class" ||
          context.template == "Fachgebiet"
        ) {
          ebene = "classes";
        } else if (
          context.template == "seminar" ||
          context.template == "course" ||
          context.template == "institution"
        ) {
          ebene = "seminars";
        } else if (
          context.template == "location-room" ||
          context.template == "location-level"
        ) {
          if (context.id in rooms) {
            rooms[context.id].push(curr.node.id);
          }
          rooms[context.id] = [curr.node.id];
        }
        if (ebene) {
          if (i > 1) {
            if (context.id in pathlist) {
              let newpaths = pathlist[context.id].concat(currpaths);
              pathlist[context.id] = [
                ...new Map(newpaths.map(item => [item.id, item])).values(),
              ];
            } else {
              pathlist[context.id] = currpaths;
            }
            let ancestors = currpaths.map(p => p.id);
            tags[ebene][context.id] = {
              ...context,
              ancestors:
                context.id in tags[ebene]
                  ? [
                      ...new Set(
                        tags[ebene][context.id].ancestors.concat(ancestors),
                      ),
                    ]
                  : ancestors,
            };
          } else {
            tags[ebene][context.id] = { ...context, ancestors: [] };
          }
        }
      });
    }

    Object.entries(curr.node.children).map(([k, v]) => {
      let currPath = [...curr.path, v];
      queue.push({
        node: v,
        id: k,
        path: currPath,
      });
    });
  }
  let result = Object.entries(tags).reduce((obj, [k, v]) => {
    if (Object.values(v).length) {
      return { ...obj, [k]: Object.values(v) };
    }
    return obj;
  }, {});

  console.log("done with data");

  return { tags: result, rooms, eventlist, pathlist };
};

export default wrangleData;
