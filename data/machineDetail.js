import MachineCategory from '../models/machineCategory';
//data to populate the list screen
 const MACHINECATEGORY = [
   new MachineCategory(
     "0",
     "Tractor",
     "#f5a442",
     "https://images.unsplash.com/photo-1506092490682-b2cc6b651308?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
     "A tractor is a vehicle that's used on a farm or work site, often to pull a trailer or other equipment. A farmer might use a tractor to pull a plow through her corn field before planting. Tractors typically have two large wheels in back, and smaller wheels in front.",
     [
       "Tractor extension could come in contact with power lines - electrocuting the operator",
       "Broken bones or fractures",
       "Turnovers: These caused about 60 people dead every year.",
       "Lacerations",
       "Collisions with other vehicles",
     ],
     [
       "Operators must be trained/experienced enough to there job",
       "Always Wear a seatbelt and ensure that the tractor has Roll-Over Protective Structure(ROPS)",
       "Do not carry passengers on tractors that do not have instructional seats,ROPS and safety belts",
       "Ensure Power take off(PTO) shaft and connections are guarded and keep clear when it is engageg",
       "Never jump on or off a moving tractor"
      ],
      [
        "Call 1100 to find location of underground power cables to avoid electrocution",
        "Tractors over 560kg should have a ROPS-compliant cabin",
        "You must wear a seatbelt to avoid being thrown out of the tractor",
        "Fit a long, plastic (non-conductive) flexible pole in front of the tractor to warn you of unnoticed hazards",
        "While working, establish a safe work zone and exclude by-standers from the work area",
        "Never start or operate the tractor from the ground"
      ]
   ),
   new MachineCategory(
     "1",
     "Bulldozer",
     "#f5a442",
     "https://images.unsplash.com/photo-1555901328-0cd418debc81?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=334&q=80",
     "A bulldozer is a tractor equipped with a substantial metal plate (known as a blade) used to push large quantities of soil, sand, rubble, or other such material during construction or conversion work and typically equipped at the rear with a claw-like device",
     [
       "Brain or head injuries",
       "Broken bones or fractures",
       "Crush injuries",
       "Lacerations",
       "Oral and facial trauma",
     ],
     [
       "Risk due to No proper mounting and dismounting",
       "Lack of inspection and repairs",
       "Becoming entangled in machinery",
     ],
     [
       "Never use a bulldozer that has not been inspected pre-shift — fluid levels, brakes, signals, etc.",
       "Be aware of changes on the work site that will affect safety, excavations, etc.",
       "Call 1100 to find location of underground power cables to avoid electrocution",
       "If there isn’t a specified hand or foot hold, don’t climb there",
       "Always park on level ground",
       "Bulldozers should be kept away from overhead power lines and water mains",
       "There must never be passengers on the Bulldozer"
      ]
   ),
   new MachineCategory(
     "3",
     "Hay-baler",
     "#f5a442",
     "https://unsplash.com/photos/FJq5WZ6sbNU/download?force=true&w=640",
     "Hay balers are a specialised piece of farm machinery which are used to compress harvested crops into bales for easy storage and transport. Mechanical hay balers are exponentially faster at collecting and compacting hay, and have revolutionised the productive capacity of modern farming operations. Different types of balers are commonly used, each producing a different type of bale – rectangular or cylindrical, of various sizes, bound with twine, strapping, netting, or wire.",
     [
       "Crush injuries",
       "Lacerations",
       "Oral and facial trauma",
       "Broken bones or fractures",
     ],
     [
       "Injuries sustained from contact with machinery in operation",
       "Run over by tractors/machinery",
       "Becoming entangled in machinery, farmers can suffer amputations, loss of skin and tissue and other bodily mutilation from being pulled into hay balers.",
       "Abrasions from sharp components (e.g. knives on balers and mowers)",
       "Loading and unloading hay bales (including stacking)",
       "Falling or collapsing hay bales. Workers and others (bystanders) can be placed at risk by falling or collapsing hay bales",
     ],[
       "Never feed the material into the baler with your hands or feet.",
       "Never handfeed or remove twine from the machine while it is running.",
       "When not in use, clean the baler to remove accumulated crop debris",
       "When ejecting a bale, ensure the area behind the baler is clear before raising the tailgate. Do not eject on a downward slope as the bale may continue to roll.",
       "Match belt lengths to prevent slippage that can cause blockages and heat build-up.",
       "Ensure all guards are fitted, secure and functional. Do not operate if guards are missing or faulty."
     ]
   ),
   new MachineCategory(
     "4",
     "Quad-bike",
     "#f5a442",
     "https://unsplash.com/photos/1A0SYHr_yWg/download?force=true&w=640",
     "The all-terrain vehicle (ATV, also known as the quad bike) is one of the indispensable tools for most farmers. Although they are not designed for tractors, they reduce the need for them on most small farms. ATVs can perform a variety of agricultural tasks, including transporting people and equipment from site a to site B, towing trailers, spraying pesticides, and spreading pesticides.",
     [
       "Head/chest gets crushed between quad bike and ground",
       "Head injuries are commonly sustained on quad bikes",
       "Strangulation from riding through a fence",
       "Broken bones, including pelvis and thigh bone fractures",
     ],
     [
       "Injuries sustained from contact with machinery in operation",
       "Run over by tractors/machinery",
       "Becoming entangled in machinery, farmers can suffer amputations, loss of skin and tissue and other bodily mutilation from being pulled into hay balers.",
       "Abrasions from sharp components (e.g. knives on balers and mowers)",
       "Loading and unloading hay bales (including stacking)",
       "Falling or collapsing hay bales. Workers and others (bystanders) can be placed at risk by falling or collapsing hay bales",
     ],
     [
       "Wear an AS 1698-2006 compliant helmet.",
       "Never operate an overloaded quad bike",
       "The more load you carry, the slower your speed should be",
       "Use tanks with baffles to reduce the movement of liquid in your load",
       "Avoid hills and rough terrain on your quad bike",
       "Sunglasses won't cut it - use helmets with visors or use goggles"
     ]
   ),
   new MachineCategory(
     "2",
     "Farm slasher",
     "#f5a442",
     "https://media.machines4u.com.au/machinery/35/440335/2018-TEAGLE-DYNAMO-6-SINGLE-ROLLER-SLASHER-7-CUT-_20529122.h.jpg",
     "All AGRIFARM Slashers are Australian made utilising the highest quality components and features not offered by our opposition. Sizes range from 90cm for small tractors up to 360cm for heavy duty farming applications, contractors and councils",
     [
       "Broken bones, including pelvis and thigh bone fractures",
       "Broken bones or fractures",
       "Run over by slasher attachment",
     ],
     [
       "Prone to tipping and rolling.",
       "legs (of either rider or passenger) getting caught by the tyres",
       "The quad bike flipping or rolling while negotiating a steep slope",
       "The quad bike hitting an obstacle and rolling over",
       "The rider being hit by a low-hanging obstacle, such as a branch",
     ],
     [
       "Before Operation, inspect condition of slasher blades, bolts, gearbox, shafts and rotors",
       "Where practical, clear stones and rubbish from ground before starting to slash",
       "The front and rear end of the slasher must be covered by a guard",
       "When slashing on slopes, ensure wheels of tractor are on maximum width",
       "Ensure area being slashed is clear of people"
     ]
   ),
 ];
export default MACHINECATEGORY