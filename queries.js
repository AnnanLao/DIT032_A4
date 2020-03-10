//MGDB3.1
db.conferences.count()

//MGDB3.2
db.conferences.find({}, {
	"name": 1,
	"_id": 1
})

//MGDB3.3
db.delegates.distinct("country")

//MGDB3.4
db.conferences.find({
	tracks: {
		$elemMatch: {
			"topic": "practice"
		}
	}
})

//MGDB3.5
db.conferences.find({
	"duration.begin": {
		$gt: new ISODate("2019-03-31T23:59:59Z"),
		$lt: new ISODate("2019-05-01T00:00:00Z")
	}
})

//MGDB3.6
db.delegates.find({
	$where: "this.attends.length > 1"
});

//MGDB3.7
db.delegates.find({
	$or: [{
		name: {
			$regex: /^B/i
		}
	}, {
		name: {
			$regex: /^D/i
		}
	}]
})

// MGDB3.8
db.conference.update({
	"conference.name": "MSR'16"
}, {
	$set: {
		"general_chair": "Gregg Rothermel"
	}
})

// MGDB3.9
db.conference.remove({
	"location.country": "India"
},{ 
	$unset: { 
		"location.city": ""
	}
})

// MGDB3.10
db.conferences.aggregate(
	[{
		$lookup: {
			from: "delegates",
			localField: "general_chair",
			foreignField: "name",
			as: "chair_delegates"
		}
	}]
)

db.conferences.find(
	{ "chair_delegates": { $exists: true } },
        {"name":1, "edition":1}
)
