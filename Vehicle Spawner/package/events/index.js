
mp.events.add("server:vehicleSpawn", (player, veh) =>
{
    let veh = mp.vehicles.new(mp.joaat(veh), player.position,
    {
        numberPlate: "TEST",
    });
    player.putIntoVehicle(veh, 0);
});