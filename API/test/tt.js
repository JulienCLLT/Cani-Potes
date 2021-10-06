{
    "{\"sender_id\": 1, \"message_id\": 1, \"sender_first_name\": \"Jojo\"}",           //OK
        "{\"sender_id\": 2, \"message_id\": 1, \"sender_first_name\": \"Sheldon\"}",
        "{\"sender_id\": 3, \"message_id\": 1, \"sender_first_name\": \"Sherlock\"}",

        "{\"sender_id\": 2, \"message_id\": 2, \"sender_first_name\": \"Sheldon\"}",
        "{\"sender_id\": 3, \"message_id\": 2, \"sender_first_name\": \"Sherlock\"}",       //OK

        "{\"sender_id\": 3, \"message_id\": 3, \"sender_first_name\": \"Sherlock\"}",
        "{\"sender_id\": 2, \"message_id\": 3, \"sender_first_name\": \"Sheldon\"}",        //OK

        "{\"sender_id\": 1, \"message_id\": 4, \"sender_first_name\": \"Jojo\"}",           //OK
        "{\"sender_id\": 2, \"message_id\": 4, \"sender_first_name\": \"Sheldon\"}",
        "{\"sender_id\": 3, \"message_id\": 4, \"sender_first_name\": \"Sherlock\"}"
}

{
    "{\"sender_id\": 2, \"message_id\": 3, \"sender_first_name\": \"Sheldon\"}",
        "{\"sender_id\": 3, \"message_id\": 2, \"sender_first_name\": \"Sherlock\"}"
}

{
    "{\"sender_id\": 1, \"message_id\": 1, \"sender_first_name\": \"Jojo\"}",
    "{\"sender_id\": 1, \"message_id\": 4, \"sender_first_name\": \"Jojo\"}",
    "{\"sender_id\": 2, \"message_id\": 3, \"sender_first_name\": \"Sheldon\"}",
    "{\"sender_id\": 3, \"message_id\": 2, \"sender_first_name\": \"Sherlock\"}"
}



/*

SELECT
    ride.id AS ride_id,
    array_agg(DISTINCT
        jsonb_build_object(
            'sender_id', sender.id,
            'sender_first_name', sender.first_name,
            'message_id', message.id
        )) FILTER (WHERE sender.id IS NOT NULL) AS messages
FROM ride
JOIN tag ON tag.id = tag_id
JOIN member AS host ON host.id = host_id
LEFT JOIN member_write_ride AS message ON message.ride_id = ride.id
LEFT JOIN member_participate_ride ON member_participate_ride.ride_id = ride.id
LEFT JOIN member AS sender ON sender.id = message.member_id OR member_participate_ride.member_id = sender.id
LEFT JOIN member AS participant ON participant.id = member_participate_ride.member_id OR participant.id = host.id
LEFT JOIN dog ON dog.dog_owner_id = member_participate_ride.member_id
GROUP BY ride.id, tag.label, host.id, host.first_name;
*/