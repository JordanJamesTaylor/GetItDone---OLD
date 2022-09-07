print 'SEEDING USER'
Profile.create!(username: "James Dean", email: "james@email.com", password: '123456');

print 'SEEDING GROUPS'
Group.create!(title: 'Group One', profile_id: 1);
Group.create!(title: 'Group Two', profile_id: 1);
Group.create!(title: 'Group Three', profile_id: 1);

print 'SEEDING TASKS'
Task.create!(title: 'Task One', profile_id: 1);
Task.create!(title: 'Task Two', profile_id: 1);
Task.create!(title: 'Task Three', profile_id: 1);

print 'SEEDING GROUP TASKS'
Task.create!(title: 'Task One For Group One', profile_id: 1, group_id: 1);
Task.create!(title: 'Task One For Group TWO', profile_id: 1, group_id: 2);
Task.create!(title: 'Task Two For Group TWO', profile_id: 1, group_id: 2);
Task.create!(title: 'Task Three For Group ONE', profile_id: 1, group_id: 3);
Task.create!(title: 'Task Three For Group TWO', profile_id: 1, group_id: 3);
Task.create!(title: 'Task Three For Group THREE', profile_id: 1, group_id: 3);

print 'DONE SEEDING'