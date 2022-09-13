print 'SEEDING USER'
Profile.create!(first_name: "James", last_name: "Dean", username: "James Dean", email: "james@email.com", password: '123456');

print 'SEEDING GROUPS'
Group.create!(title: 'Capstone Project', profile_id: 1);
Group.create!(title: 'Personal', profile_id: 1);
Group.create!(title: 'Fitness', profile_id: 1);
Group.create!(title: 'Groceries', profile_id: 1);
Group.create!(title: 'Misc', profile_id: 1);

#print 'SEEDING TASKS'
Task.create!(title: 'Buy dog food', profile_id: 1, end_time: Date.today);
Task.create!(title: "Go to the gym", profile_id: 1, end_time: Date.today);
Task.create!(title: 'Buy human food', profile_id: 1, end_time: Date.today);

print 'DONE SEEDING'