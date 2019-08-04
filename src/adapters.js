export function tiltToBrewersFriend(tiltData) {
  return {
    name: `Fermentory Tilt ${tiltData.color}`,
    device_source: "Tilt",
    report_source: "Fermentory",
    temp: tiltData.temperature,
    temp_unit: "F",
    gravity: tiltData.gravity,
    gravity_unit: "G",
  };
}
