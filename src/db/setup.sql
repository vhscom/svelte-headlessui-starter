drop table if exists navigation;

drop table if exists event;

-- Create a table for Navigation Items
create table navigation (
	name varchar(35) not null unique check (char_length(name) > 0),
	href varchar(255) not null unique,
	weight smallint not null,
	primary key (name, href)
);

-- Populate Navigation Items
insert into navigation (name, href, weight)
	values ('Dashboard', '/dashboard', 1);

insert into navigation (name, href, weight)
	values ('Team', '/team', 2);

insert into navigation (name, href, weight)
	values ('Projects', '/projects', 3);

insert into navigation (name, href, weight)
	values ('Calendar', '/calendar', 4);

-- Prevent anonymous changes to Navigation
alter table navigation enable row level security;

-- Allow anyone to view the Navigation
create policy "Navigation viewable by everyone" on navigation
	for select
		using (true);

-- Create a table for Calendar Events
create table event (
	id bigint generated by default as identity primary key,
	inserted_at timestamp with time zone default timezone('utc'::text, now()) not null,
	updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
	start_date date not null,
	start_time time with time zone,
	end_date date,
	end_time time with time zone,
	title varchar(80) not null check (char_length(title) > 0),
	location varchar(255),
	url varchar(255)
);

