package com.example.lab2.service

import android.content.Intent
import android.os.Build
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.widget.AutoCompleteTextView
import android.widget.EditText
import android.widget.ImageView
import android.widget.Toast
import androidx.annotation.RequiresApi
import com.example.lab2.R
import com.example.lab2.data.Task
import com.example.lab2.utils.TaskUtils.setupAutoComplete
import com.example.lab2.utils.TaskUtils.showDatePickerDialog
import com.example.lab2.utils.TaskUtils.showTimePickerDialog
import com.example.lab2.adapter.TaskAdapter

class UpdateTaskActivity : AppCompatActivity() {

    private lateinit var etTitle: EditText
    private lateinit var autoCompletePriorityLevel: AutoCompleteTextView
    private lateinit var etDateDeadline: EditText
    private lateinit var etTimeDeadline: EditText
    private lateinit var etDescription: EditText

    @RequiresApi(Build.VERSION_CODES.TIRAMISU)
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_update_task)

        etTitle = findViewById(R.id.etTitle)
        autoCompletePriorityLevel = findViewById(R.id.autoCompletePriorityLevel)
        etDateDeadline = findViewById(R.id.etDateDeadline)
        etTimeDeadline = findViewById(R.id.etTimeDeadline)
        etDescription = findViewById(R.id.etDescription)

        val goBackArrow : ImageView = findViewById(R.id.ivBackButton)
        val ivSaveButton: ImageView = findViewById(R.id.ivSaveButton)
        val taskDetails = intent.getParcelableExtra("taskDetails", Task::class.java)

        etTitle.setText(taskDetails?.title)
        autoCompletePriorityLevel.setText(taskDetails?.priorityLevel)
        etDateDeadline.setText(taskDetails?.dateDeadline)
        etTimeDeadline.setText(taskDetails?.timeDeadline)
        etDescription.setText(taskDetails?.description)

        goBackArrow.setOnClickListener { finish() }
        ivSaveButton.setOnClickListener { saveTask() }

        etDateDeadline.setOnClickListener {
            showDatePickerDialog(this, etDateDeadline)
        }
        etTimeDeadline.setOnClickListener {
            showTimePickerDialog(this, etTimeDeadline)
        }

        setupAutoComplete(this, autoCompletePriorityLevel)
    }

    @RequiresApi(Build.VERSION_CODES.TIRAMISU)
    private fun saveTask() {
        val title = etTitle.text.toString()
        val priorityLevel = autoCompletePriorityLevel.text.toString()
        val dateDeadline = etDateDeadline.text.toString()
        val timeDeadline = etTimeDeadline.text.toString()
        val description = etDescription.text.toString()

        if (title.isBlank()) {
            etTitle.error = "Required"
        } else {
            val existingTask = intent.getParcelableExtra("taskDetails", Task::class.java)

            existingTask?.title = title
            existingTask?.priorityLevel = priorityLevel
            existingTask?.dateDeadline = dateDeadline
            existingTask?.timeDeadline = timeDeadline
            existingTask?.description = description

            val intent = Intent(this, TaskAdapter::class.java)
            intent.putExtra("updatedTask", existingTask)
            setResult(RESULT_OK, intent)
            finish()
            Toast.makeText(this, "Task updated", Toast.LENGTH_SHORT).show()
        }
    }
}