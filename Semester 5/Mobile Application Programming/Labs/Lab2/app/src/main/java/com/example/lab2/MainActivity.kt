package com.example.lab2

import android.content.Intent
import android.os.Build
import android.os.Bundle
import androidx.activity.result.ActivityResultLauncher
import androidx.activity.result.contract.ActivityResultContracts
import androidx.annotation.RequiresApi
import androidx.appcompat.app.AppCompatActivity
import androidx.recyclerview.widget.LinearLayoutManager
import androidx.recyclerview.widget.RecyclerView
import com.example.lab2.adapter.TaskAdapter
import com.example.lab2.data.Task
import com.example.lab2.service.AddTaskActivity
import com.google.android.material.floatingactionbutton.FloatingActionButton


class MainActivity : AppCompatActivity() {

    private val tasksList = mutableListOf(Task("Mobile Apps"))

    @RequiresApi(Build.VERSION_CODES.TIRAMISU)
    val startForResultUpdate: ActivityResultLauncher<Intent> = registerForActivityResult(
        ActivityResultContracts.StartActivityForResult()
    ) { result ->
        if (result.resultCode == RESULT_OK) {
            if (result.data != null) {
                val newTask = result.data!!.getParcelableExtra("updatedTask", Task::class.java)
                if (newTask != null) {
                    taskAdapter.updateTask(newTask)
                }
            }
        }
    }

    @RequiresApi(Build.VERSION_CODES.TIRAMISU)
    private val taskAdapter = TaskAdapter(tasksList, this, startForResultUpdate)

    @RequiresApi(Build.VERSION_CODES.TIRAMISU)
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        val rvTaskItems : RecyclerView = findViewById(R.id.rvTaskItems)
        rvTaskItems.adapter = taskAdapter
        rvTaskItems.layoutManager = LinearLayoutManager(this)

        val btnAddTask : FloatingActionButton = findViewById(R.id.btnAddTask)
        btnAddTask.setOnClickListener {
            val intent = Intent(this, AddTaskActivity::class.java)
            startForResultAdd.launch(intent)
        }
    }

    @RequiresApi(Build.VERSION_CODES.TIRAMISU)
    private val startForResultAdd: ActivityResultLauncher<Intent> = registerForActivityResult(
        ActivityResultContracts.StartActivityForResult()
    ) { result ->
        if (result.resultCode == RESULT_OK) {
            if (result.data != null) {
                val newTask = result.data!!.getParcelableExtra("newTask", Task::class.java)
                if (newTask != null) {
                    taskAdapter.addTask(newTask)
                }
            }
        }
    }
}
//
//@Composable
//fun Greeting(name: String, modifier: Modifier = Modifier) {
//    Text(
//        text = "Hello $name!",
//        modifier = modifier
//    )
//}
//
//@Preview(showBackground = true)
//@Composable
//fun GreetingPreview() {
//    Lab2Theme {
//        Greeting("Android")
//    }
//}