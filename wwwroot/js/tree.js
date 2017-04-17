$Flinger.SiteMapPoint = {}
$Flinger.SiteMap = (function (window, d3) {
	var treeMapContainer = document.querySelector('#treeMap');

	var m = [20, 120, 20, 120],
		//w = 1280 - m[1] - m[3],
		h = 500 - m[0] - m[2],
		i = 0,
		root;

	var w = 900;

	if (treeMapContainer != null) {
		w = treeMapContainer.clientWidth > 900 ? (treeMapContainer.clientWidth - m[1] - m[3]) : w;
	}

	var setConnector = function (type) {
		connector = window[type];
		update(root);
	};

	var selectNode = function (target) {
		if (target) {
			var sel = d3.selectAll('#treeMap svg .node').filter(function (d) { return d.id == target.id })[0][0];
			if (sel) {
				select(sel);
			}
		}
	};

	var select = function (node) {
		// Find previously selected, unselect
		d3.select(".selected").classed("selected", false);
		// Select current item
		d3.select(node).classed("selected", true);
	};

	var createNew = function (name) {
		if (d.Screenshot) { ////////

		}
		root = { Name: name, Childs: [], left: [], right: [] };
		update(root, true);
		selectNode(root);
	};

	var handleClick = function (d, index) {
		$Flinger.SiteMapPoint.Name = d.Name;
		$Flinger.SiteMapPoint.Screenshot = d.Screenshot;

		select(this);
		update(d);

		if ($Flinger.SiteMapPoint.Screenshot.length > 0) {
			var initialData = {
				"Name": d.Name,
				"Childs": []
			}

			loadJSON(initialData);

			$Flinger.AddPersistentData('SiteMapPoint', $Flinger.SiteMapPoint);

			var heatmapTreeSelected = new CustomEvent('HeatmapTreeSelected', {});
			document.dispatchEvent(heatmapTreeSelected);
		}

	};

	var tree = d3.layout.tree()
		.size([h, w]);

	var calcLeft = function (d) {
		var l = d.y;
		if (d.position === 'left') {
			l = (d.y) - w / 3;
			l = (w / 3) + l;
		}
		return { x: d.x, y: l };
	};

	var diagonal = d3.svg.diagonal()
		.projection(function (d) { return [d.y, d.x]; });
	var elbow = function (d, i) {
		var source = calcLeft(d.source);
		var target = calcLeft(d.target);
		var hy = (target.y - source.y) / 2;
		return "M" + source.y + "," + source.x
			+ "H" + (source.y + hy)
			+ "V" + target.x + "H" + target.y;
	};
	var connector = diagonal;

	var vis;

	if (treeMapContainer != null) {
		if (treeMapContainer.clientWidth > 1025) {
			vis = d3.select("#treeMap")
				.append("svg:svg")
				.attr("width", w + m[1] + m[3])
				.attr("height", h + m[0] + m[2])
				.append("svg:g")
				//.attr("transform", "translate(" + m[3] + "," + m[0] + ")")
				.attr("transform", "translate(" + (w / 3 + m[3]) + "," + m[0] + ")")
				;
		}
		else {
			vis = d3.select("#treeMap")
				.append("svg:svg")
				.attr("width", w + m[1] + m[3])
				.attr("height", h + m[0] + m[2])
				.append("svg:g")
				.attr("transform", "translate(" + m[3] + "," + m[0] + ")")
				//.attr("transform", "translate(" + (w / 3 + m[3]) + "," + m[0] + ")")
				;
		}
	}



	//*
	var loadJSON = function (json) {
		var i = 0, l = json.Childs.length;
		window.data = root = json;
		root.x0 = h / 2;
		root.y0 = 0;

		json.left = [];
		json.right = [];
		for (; i < l; i++) {
			json.right.push(json.Childs[i]);
			json.Childs[i].position = 'right';
		}

		update(root, true);
		selectNode(root);
	};

	var toArray = function (item, arr, d) {
		arr = arr || [];
		var dr = d || 1;
		var i = 0, l = item.Childs ? item.Childs.length : 0;
		arr.push(item);
		if (item.position && item.position === 'left') {
			dr = -1;
		}
		item.y = dr * item.y;
		for (; i < l; i++) {
			toArray(item.Childs[i], arr, dr);
		}
		return arr;
	};

	function update(source, slow) {
		var duration = (d3.event && d3.event.altKey) || slow ? 1000 : 100;

		// Compute the new tree layout.
		var nodesLeft = tree
			.size([h, (w / 2) - 20])
			.children(function (d) {
				return (d.depth === 0) ? d.left : d.Childs;
			})
			.nodes(root)
			.reverse();
		var nodesRight = tree
			.size([h, w / 2])
			.children(function (d) {
				return (d.depth === 0) ? d.right : d.Childs;
			})
			.nodes(root)
			.reverse();
		root.Childs = root.left.concat(root.right);
		root._Childs = null;
		var nodes = toArray(root);

		// Normalize for fixed-depth.
		//nodes.forEach(function(d) { d.y = d.depth * 180; });

		// Update the nodes…
		var node = vis.selectAll("g.node")
			.data(nodes, function (d) { return d.id || (d.id = ++i); });

		// Enter any new nodes at the parent's previous position.
		var nodeEnter = node.enter().append("svg:g")
			.attr("class", function (d) { return d.selected ? "node selected" : "node"; })
			.attr("transform", function (d) { return "translate(" + source.y0 + "," + source.x0 + ")"; })
			.on("click", handleClick);

		nodeEnter.append("svg:circle")
			.attr("r", 1e-6).style("fill", function (d) { return d._Childs ? "lightsteelblue" : "#fff"; });

		nodeEnter.append("svg:text")
			.attr("x", function (d) { return d.Childs || d._Childs ? 0 : 10; })
			//            .attr("dy", ".35em")
			//            .attr("text-anchor", function(d) { return d.Childs || d._Childs ? "end" : "start"; })
			.attr("dy", 20)
			.attr("text-anchor", "middle")
			.text(function (d) { return (d.Name || d.text); })
			.style("fill-opacity", 1);

		// Transition nodes to their new position.
		var nodeUpdate = node.transition()
			//.attr("class", function(d){ return d.selected?"node selected":"node"; })
			.duration(duration)
			.attr("transform", function (d) { return "translate(" + d.y + "," + d.x + ")"; });

		nodeUpdate.select("text")
			.text(function (d) { return (d.Name || d.text); });

		nodeUpdate.select("circle")
			.attr("r", 7.5).style("fill", function (d) { return d.Screenshot == "" ? "rgb(208, 208, 208)" : "#fff"; });

		/*
				nodeUpdate.select("text")
					.attr("dy", 14)
					.attr("text-anchor", "middle")
					.style("fill-opacity", 1);
		*/

		// Transition exiting nodes to the parent's new position.
		var nodeExit = node.exit().transition()
			.duration(duration)
			.attr("transform", function (d) { return "translate(" + source.y + "," + source.x + ")"; })
			.remove();

		nodeExit.select("circle")
			.attr("r", 1e-6);

		nodeExit.select("text")
			.style("fill-opacity", 1e-6);

		// Update the links…
		var link = vis.selectAll("path.link")
			.data(tree.links(nodes), function (d) { return d.target.id; });

		// Enter any new links at the parent's previous position.
		link.enter().insert("svg:path", "g")
			.attr("class", "link")
			.attr("d", function (d) {
				var o = { x: source.x0, y: source.y0 };
				return connector({ source: o, target: o });
			})
			.transition()
			.duration(duration)
			.attr("d", connector);

		// Transition links to their new position.
		link.transition()
			.duration(duration)
			.attr("d", connector);

		// Transition exiting nodes to the parent's new position.
		link.exit().transition()
			.duration(duration)
			.attr("d", function (d) {
				var o = { x: source.x, y: source.y };
				return connector({ source: o, target: o });
			})
			.remove();

		// Stash the old positions for transition.
		nodes.forEach(function (d) {
			d.x0 = d.x;
			d.y0 = d.y;
		});
	}

	return {
		update: update,
		loadJSON: loadJSON,
		setConnector: setConnector,
		createNew: createNew
	}

})(window, d3);

$Flinger.SiteMobileMap = (function (window) {
	var html = '';
	var indent = 1;

	var loadJSON = function (json) {
		html = '';

		$('.tree-map-mobile>ul').remove();

		createMobileMap(json);

		$('.tree-map-mobile').append(html);
	};

	var handleClick = function (name, screenshot) {
		$Flinger.SiteMapPoint.Name = name;
		$Flinger.SiteMapPoint.Screenshot = screenshot;

		if ($Flinger.SiteMapPoint.Screenshot.length > 0) {
			$Flinger.AddPersistentData('SiteMapPoint', $Flinger.SiteMapPoint);

			var heatmapTreeSelected = new CustomEvent('HeatmapTreeSelected', {});
			document.dispatchEvent(heatmapTreeSelected);
		}

	};

	var createMobileMap = function (json) {
		if (json.Childs != undefined && json.Childs.length > 0) {
			html += '<ul>'

			if (json.Screenshot != undefined && json.Screenshot.length > 0) {
				html += '<li><a href="javascript:($Flinger.SiteMobileMap.handleClick(\'' + json.Name + '\', \'' + json.Screenshot + '\'))">' + json.Name + '</a></li>';
			}
			else {
				html += '<li>' + json.Name + '</li>';
			}

			json.Childs.forEach(function (node) {
				html += '<ul>'
				if (node.Screenshot != undefined && node.Screenshot.length > 0) {
					html += '<li><a href="javascript:($Flinger.SiteMobileMap.handleClick(\'' + node.Name + '\', \'' + node.Screenshot + '\'))">' + node.Name + '</a></li>';
				}
				else {
					html += '<li>' + node.Name + '</li>';
				}

				if (node.Childs) {
					indent++;
					createMobileMap(node.Childs);
				}
				if (json.Childs.indexOf(node) === json.Childs.length - 1) {
					indent--;
				}
				html += '</ul>';
			});
			html += '</ul>';
		}
		else {
			html += '<ul>';
			if (json.length > 0) {
				if (json[0].Screenshot != undefined && json[0].Screenshot.length > 0) {
					html += '<li><a href="javascript:($Flinger.SiteMobileMap.handleClick(\'' + json[0].Name + '\', \'' + json[0].Screenshot + '\'))">' + json[0].Name + '</a></li>';
				}
				else {
					html += '<li>' + json[0].Name + '</li>';
				}

			}
			else {
				if (json.Screenshot != undefined && json.Screenshot.length > 0) {
					html += '<li><a href="javascript:($Flinger.SiteMobileMap.handleClick(\'' + json.Name + '\', \'' + json.Screenshot + '\'))">' + json.Name + '</a></li>';
				}
				else {
					html += '<li>' + json.Name + '</li>';
				}
			}
			html += '</ul>';
		}

	}

	return {
		loadJSON: loadJSON,
		handleClick: handleClick
	}
})();

var initialData = {
	"Name": "Index",
	"Childs": []
}

