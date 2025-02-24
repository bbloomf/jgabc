import os

def create_index_of_files_without_extension():
    try:
        # Get the current directory where the script is located
        folder_path = os.getcwd()

        # Path for the output index.txt
        output_file = os.path.join(folder_path, "index.txt")
        
        # Open index.txt for writing
        with open(output_file, "w", encoding="utf-8") as index_file:
            # Loop through all files in the folder
            for file_name in os.listdir(folder_path):
                # Full path to the file
                full_path = os.path.join(folder_path, file_name)
                
                # Check if it's a file without an extension
                if os.path.isfile(full_path) and not os.path.splitext(file_name)[1]:
                    # Write the file name to index.txt
                    index_file.write(file_name + "\n")
        
        print(f"Index file created: {output_file}")
    except Exception as e:
        print(f"Error: {e}")

# Run the function
create_index_of_files_without_extension()
