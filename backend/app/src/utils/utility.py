
def file_to_binary(file_path: str) -> bytes:
    """Converts a file to binary data for storage.

    Args:
        file_path (str): Path of the file location to convert.

    Returns:
        bytes: File data in bytes.
    """
    try:
        with open(file_path, "rb") as file_binary:
            return file_binary.read()
    
    except Exception as e:
        print(e)
