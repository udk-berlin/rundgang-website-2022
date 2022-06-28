const filterContext = tree => {
  let tags = {
    ebene0: {},
    initiatives: {},
    ebene1: {},
    classes: {},
    seminars: {},
  };

  let queue = [{ node: tree, id: tree.id, path: [tree] }];
  let explored = [];
  while (queue.length > 0) {
    let curr = queue.shift();
    if (curr.node.type == "item") {
      curr.path.map((context, i) => {
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
        } else if (context.template == "class") {
          ebene = "classes";
        } else if (
          context.template == "seminar" ||
          context.template == "course"
        ) {
          ebene = "seminars";
        }
        if (ebene) {
          if (i > 1) {
            let ancestors = curr.path.slice(0, i - 1).map(p => p.id);
            tags[ebene][context.id] = {
              ...context,
              ancestors:
                context.id in tags.ebene0
                  ? [
                      ...new Set(
                        tags.ebene0[context.id].ancestors.concat(ancestors),
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
      if (explored.indexOf(k) == -1) {
        let currPath = [...curr.path, v];
        queue.push({
          node: v,
          id: k,
          path: currPath,
        });
      }
    });
  }
  let result = Object.entries(tags).reduce((obj, [k, v]) => {
    if (Object.values(v).length) {
      return { ...obj, [k]: Object.values(v) };
    }
    return obj;
  }, {});

  return result;
};

export default filterContext;
