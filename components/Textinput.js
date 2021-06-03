import React, { useState, useEffect } from 'react'
import { Text, View, TextInput, Button, ScrollView,FlatList,StyleSheet, Pressable } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage';

export default function Textinput() {
    const [key,setkey] = useState([])
    const [entered,enterredtask] = useState('')
    const [enter,entereddate]= useState('')    
    const [tasks,settasks]= useState([])
    const [toggle,changetoggle] = useState('true')
    const [clear,setclear] = useState('false')

    useEffect(()=>{
        readData();
    },[])

    const readData = async () => {
        try {
          let userAge = await AsyncStorage.getItem("test")
          let gettasks = JSON. parse(userAge);

          if (gettasks !== null) {
            settasks(gettasks)
            console.log(tasks)
            console.log('data fetched succesfully')
            setclear('false')
         }} catch (e) {
          alert('Failed to fetch the data')
          alert(e)
        }}
    const goalhandler =(val)=>{
        enterredtask(val)
    }
    const datehandler =(val)=>{
        entereddate(val)
    }
    const goalprinter= ()=>{

        if(enter && entered){
        const data = [...tasks,{key:Math.floor(Math.random() * 1000).toString(),value:entered,date:enter }]
        settasks(data)
        tasks.map((tasks) =>  
        setkey(tasks.key))
        setclear('true')

        const saveData = async () => {
            try {
              await AsyncStorage.setItem("test",JSON.stringify(data))
              console.log(key)
            } catch (e) {
              alert(e)
            }
          }
          saveData()
            

        }else{
            alert('fill the following inputs')

        } }
        

    const changetooglestyle = () => {
        {toggle == 'false' ? changetoggle('true') : 'false'}
        {toggle == 'true' ? changetoggle('false') : 'true'}
        console.log(toggle)
    }
    const deletetask = async (key) => {
        settasks(tasks.filter((task) => task.key !== key));
       try{
        let gotdata = await AsyncStorage.getItem("test");
        let data = JSON.parse(gotdata);
        let value = data.filter(function(e){return e.key !== key});
         await AsyncStorage.setItem("test",JSON.stringify(value))
       }
       catch(e){
           console.log(e)
       }
   }

    const cleardata = async () =>{
        await AsyncStorage.removeItem("test");
        settasks(tasks.filter((task) => task.key !== task.key));
        setclear('false')
    }
        return ( 
            <ScrollView style={styles.body} >          
               <View style={{flexDirection:'row',marginTop:25,height:45,backgroundColor:'#3080ff',paddingBottom:10,height:55,justifyContent:'center',borderRadius:20}}>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              
                        <Text style={styles.head}>Task Traker</Text>
                    <View style={styles.add}>
                        {/* <Button onPress={changetooglestyle}  color={toggle == 'true' ? '#1b5df5' :'red'} title={toggle == 'true' ? 'Add' :'Close'}/>
                         */}
                         <Pressable onPress={changetooglestyle} >
                             <Text  style={toggle == 'true' ? styles.addtext :styles.closetext }  >{toggle == 'true' ? 'Add' : 'close' }</Text>
                         </Pressable>
                    </View>
               </View>

               <View style={toggle == 'false' ? styles.taskhead : styles.close}>  
                    <View style={toggle == 'false' ? styles.textinput : styles.close}>
                        <TextInput style={toggle == 'false' ? styles.taskinput : styles.close} onChangeText={goalhandler} placeholder='Add your task' />
                        <Text style={styles.at} >At</Text>
                        <TextInput style={toggle == 'false' ? styles.dateinput : styles.close} onChangeText={datehandler} keyboardType='numbers-and-punctuation' placeholder='Add your task date' /> 
                    </View>
                    <View style={styles.but}>
                        <Button color='#3080ff' onPress={goalprinter} title='add' />
                    </View> 
               </View>

                

                <View  style={styles.list1}>
                 
                    <View  style={styles.list}>
                    
                    {tasks.map((task)=> <Text onLongPress={() => deletetask(task.key)}  style={styles.outputtask} key={task.key}>
                        <View style={styles.output}>
                                <Text style={styles.newtask} >{task.value}</Text>
                                <Text>At</Text>
                                <Text style={styles.newdate} >{task.date}</Text>
                                
                        </View>
                        
                    </Text>)
                    
                    }
                    </View>
                    
                    
                    

                </View>
                <View style={clear == 'true' ? styles.clear : styles.notclear} >
                    <Pressable onPress={cleardata} >
                        <Text style={styles.button} >Clear</Text>
                    </Pressable>
                </View>
                
                
                
                
            </ScrollView>
        )}
        const styles = StyleSheet.create({
            body:{
                marginRight:10,
                marginLeft:10,
                fontFamily:'Comfortaa-VariableFont_wght',
                
            },
            tasks:{
                flexDirection:'row',
                
            },
            config:{
                flexDirection:'row'
            },
            list:{
                
             },
            list1:{
                
            },
            list2:{
                
                marginLeft:0,

            },
            taskhead:{
                flexDirection:'column',
                borderColor:'black',
                borderWidth:5,
                marginTop:30,
                marginBottom:30,
                borderRadius:10
            },
            taskheadtext:{
                fontSize:30,
                marginBottom:10,
            },
            taskheadtext1:{
                fontSize:30,
                width:170,
                marginBottom:10,
            },
            textinput:{
                flexDirection:'column'
            },
            but:{
                marginBottom:20,
                margin:20
            },
            taskinput:{
                borderWidth:1,
                borderColor:'black',
                margin:10,
                borderRadius:10,
                padding:10,
                marginTop:20
            },
            dateinput:{
                borderWidth:1,
                borderColor:'black',
                margin:10,
                borderRadius:10,
                padding:10
            },
            outputtask:{
                fontSize:20,
                backgroundColor:'white',
                marginTop:15,
                padding:10,
                // borderColor:'black',
                // borderWidth:2,
                borderRadius:10

                
            },
            head:{
                paddingTop:5,
                paddingBottom:4,
                fontSize:40,
                marginLeft:20,
                width:250 ,
                fontFamily:'ZCOOLKuaiLe-Regular',
                
                color:'#293040'
              },
              add:{
                marginTop:10,
                marginLeft:10,
                paddingHorizontal:5,
                height:40,
                marginBottom:25,
                alignItems:'flex-end',
                
              },
              close:{
                  width:0,
                  height:0,
                  
                borderColor:'white',
                borderWidth:0,
                marginTop:0,
                marginBottom:0,
                borderRadius:0
                  
              },
              newtask:{
                  color:'black',
                  fontWeight:'600',
                  fontSize:20,
                  
              },
              clear:{
                marginTop:20,
                marginBottom:20,
                flexDirection:'row',
                
                justifyContent:'space-around',
                
              },
              notclear:{
                  width:0,
                  height:0
              },
              button:{
                  color:'white',
                  backgroundColor:'#3080ff',
                  paddingVertical:10,
                  paddingHorizontal:30,
                  fontSize:20,
                  borderRadius:20,
              },
              at:{
                textAlign:'center',
                marginRight:10,
                fontSize:20,
                fontWeight:"900",

              },
              newdate:{
                color:'black',
                fontWeight:'600',
                fontSize:20,
                
                
            },
            addtext:{
                marginTop:2,
                backgroundColor:'#1b5df5',
                paddingVertical:6,
                paddingHorizontal:10,
                fontSize:15,
                fontWeight:'900',
                color:'white',
                borderRadius:15
            },
            closetext:{
                marginRight:10,
                backgroundColor:'red',
                paddingVertical:6,
                paddingHorizontal:10,
                fontSize:15,
                fontWeight:'900',
                color:'white',
                borderRadius:15,
                marginLeft:-10,
                marginTop:1
            }
        })
    
       