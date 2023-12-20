import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";

export default function FishCard({
                 name,
                 subname,
                 maxWeight,
                 maxLength,
                 img,
                 onPress,
               }) {
                 return (
                   <TouchableOpacity
                   activeOpacity={0.8}
                     onPress={onPress}
                     style={{
                       width: "100%",
                       backgroundColor: "#fff",
                       borderRadius: 15,
                     }}
                   >
                     <View
                       style={{
                         display: "flex",
                         flexDirection: "row",
                         alignItems: "center",
                         padding: 15,
                         borderBottomColor: "#f0f0f0",
                         borderBottomWidth: 1,
                       }}
                     >
                       <View
                         style={{
                           flexBasis: "auto",
                           flexGrow: 1,
                         }}
                       >
                         <View
                           style={{
                             display: "flex",
                             flexDirection: "row",
                             alignItems: "center",
                             gap: 10,
                           }}
                         >
                           <Text
                             style={{
                               fontSize: 20,
                               fontWeight: 500,
                             }}
                           >
                             {name}
                           </Text>
                           <Text
                             style={{
                               fontSize: 14,
                               fontWeight: 400,
                             }}
                           >
                             {subname}
                           </Text>
                         </View>
                       </View>
                       <View>
                         <Text
                           style={{
                             fontSize: 25,
                             fontWeight: 200,
                           }}
                         >
                           {">"}
                         </Text>
                       </View>
                     </View>
                     <View
                       style={{
                         display: "flex",
                         flexDirection: "row",
                       }}
                     >
                       <View>
                         <Image
                           style={{
                             width: 175,
                             height: 175,
                             resizeMode: "contain",

                             borderRadius: 15,
                           }}
                           source={img}
                         />
                       </View>
                       <View
                         style={{
                           flexGrow: 1,
                           padding: 15,
                           display: "flex",
                           flexDirection: "column",
                           alignItems: "flex-start",
                           justifyContent: "space-around",
                         }}
                       >
                         <View>
                           <View>
                             <Text
                               style={{
                                 fontSize: 13,
                                 fontWeight: 300,
                               }}
                             >
                               Макс. длина:
                             </Text>
                           </View>
                           <View>
                             <Text
                               style={{
                                 fontSize: 17,
                                 fontWeight: 500,
                               }}
                             >
                               {`${maxLength} см`}
                             </Text>
                           </View>
                         </View>
                         <View>
                           <View>
                             <Text
                               style={{
                                 fontSize: 13,
                                 fontWeight: 300,
                               }}
                             >
                               Макс. вес:
                             </Text>
                           </View>
                           <View>
                             <Text
                               style={{
                                 fontSize: 17,
                                 fontWeight: 500,
                               }}
                             >
                               {`${maxWeight} кг`}
                             </Text>
                           </View>
                         </View>
                       </View>
                     </View>
                   </TouchableOpacity>
                 );
               }
