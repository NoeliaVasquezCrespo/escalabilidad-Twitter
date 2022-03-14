
CREATE TABLE follow (
    follow_id int NOT NULL AUTO_INCREMENT,
    follower_id int NOT NULL,
    followee_id int NOT NULL,
    CONSTRAINT follow_pk PRIMARY KEY (follow_id)
);


CREATE TABLE post_tweet (
    post_id int NOT NULL AUTO_INCREMENT primary key,
    user_id int NOT NULL,
    text_tweet varchar(200) NOT NULL
);


create table user(
user_id int NOT NULL AUTO_INCREMENT primary key,
username varchar(50) NOT NULL,
full_name varchar(50) NOT NULL,
user_description varchar(160));


ALTER TABLE follow ADD CONSTRAINT follow FOREIGN KEY follow (follower_id)
    REFERENCES user (user_id);

ALTER TABLE follow ADD CONSTRAINT follow_user FOREIGN KEY follow_user (followee_id)
    REFERENCES user (user_id);

ALTER TABLE post_tweet ADD CONSTRAINT post_tweet_user FOREIGN KEY post_tweet_user (user_id)
    REFERENCES user (user_id);

