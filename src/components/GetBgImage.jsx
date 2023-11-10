const backgroundSkies = {
  night:
    "https://images.pexels.com/photos/631477/pexels-photo-631477.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  blue: "https://images.pexels.com/photos/281260/pexels-photo-281260.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  cloudy:
    "https://images.pexels.com/photos/19670/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  rain: "https://images.pexels.com/photos/531906/pexels-photo-531906.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  thunder:
    "https://images.pexels.com/photos/1074428/pexels-photo-1074428.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  snow: "https://images.pexels.com/photos/1004665/pexels-photo-1004665.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  partly_cloudy:
    "https://images.pexels.com/photos/53594/blue-clouds-day-fluffy-53594.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
};

export function GetBgImage(weatherCondition, isDay) {
  var lowerString = weatherCondition.toLowerCase();
  if (isDay == 0) {
    return backgroundSkies.night;
  } else if (
    lowerString.includes("rain") &&
    !lowerString.includes("heavy") &&
    !lowerString.includes("shower")
  ) {
    return backgroundSkies.thunder;
  } else if (lowerString.includes("rain")) {
    return backgroundSkies.rain;
  } else if (lowerString.includes("snow")) {
    return backgroundSkies.snow;
  } else if (lowerString.includes("partly")) {
    return backgroundSkies.partly_cloudy;
  } else if (lowerString.includes("thunder")) {
    return backgroundSkies.thunder;
  } else if (
    lowerString.includes("overcast") ||
    lowerString.includes("cloudy")
  ) {
    return backgroundSkies.cloudy;
  } else {
    // Default icon if no conditions are met
    return backgroundSkies.blue;
  }
}
